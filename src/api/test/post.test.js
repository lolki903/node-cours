const postmodel = require("../models/postModel");
const postcontroller = require("../controllers/postController");
const mongoose = require("mongoose");

jest.mock("../models/postmodel");

describe("postcontroller", () => {
  describe("getAllPost", () => {
    it("should return all post", async () => {
      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      const comments = [        { _id: "comment1", title: "John", des: "Comment 1" },        { _id: "comment2", title: "Jane", des: "Comment 2" },      ];

      postmodel.find = jest.fn().mockImplementationOnce((query, callback) => {
        callback(null, comments);
      });

      await postcontroller.getPosts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(comments);
    });

    // it("should handle errors", async () => {
    //   const req = {};
    //   const res = {
    //     status: jest.fn(() => res),
    //     json: jest.fn(),
    //   };

    //   postmodel.find = jest.fn().mockImplementationOnce((query, callback) => {
    //     callback(new Error("Database error"), null);
    //   });

    //   await postcontroller.getPosts(req, res);

    //   expect(res.status).toHaveBeenCalledWith(401);
    //   expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
    // });
  });

    // it("should handle errors", async () => {
    //   const req = { params: { id: "post1" } };
    //   const res = {
    //     status: jest.fn(() => res),
    //     json: jest.fn(),
    //   };

    //   postmodel.find = jest.fn().mockImplementationOnce((query, callback) => {
    //     callback(new Error("Database error"), null);
    //   });

    //   await postcontroller.getPost(req.params.id);

    //   expect(res.status).toHaveBeenCalledWith(401);
    //   expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
    // });

describe('postcontroller', () => {
  describe('updatecomments', () => {
    it('should return status code 200 and updated comment object on successful update', async () => {
      const mockReq = { params: { id: 'abc123' }, body: { des: 'updated des' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockComment = { _id: 'abc123', title: 'Test Name', des: 'original des' };

      jest.spyOn(postmodel, 'findByIdAndUpdate').mockImplementationOnce((id, update, callback) => {
        callback(null, mockComment);
      });

      await postcontroller.updatePosts(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockComment);
    });

    // it('should return status code 401 and error message on unsuccessful update', async () => {
    //   const mockReq = { params: { id: 'abc123' }, body: { des: 'updated des' } };
    //   const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    //   const mockError = { message: 'Update error' };

    //   jest.spyOn(postmodel, 'findByIdAndUpdate').mockImplementationOnce((id, update, callback) => {
    //     callback(mockError, null);
    //   });

    //   await postcontroller.updatePosts(mockReq, mockRes);

    //   expect(mockRes.status).toHaveBeenCalledWith(401);
    //   expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
    // });
  });

  describe('deletecomments', () => {
    it('should return status code 200 and deleted comment object on successful delete', async () => {
      const mockReq = {};
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockComment = { _id: 'abc123', title: 'Test Name', des: 'original des' };

      jest.spyOn(postmodel, 'deleteMany').mockImplementationOnce((query, callback) => {
        callback(null, mockComment);
      });

      await postcontroller.deletePosts(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockComment);
    });

    // it('should return status code 401 and error message on unsuccessful delete', async () => {
    //   const mockReq = {};
    //   const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    //   const mockError = { message: 'Delete error' };

    //   jest.spyOn(postmodel, 'deleteMany').mockImplementationOnce((query, callback) => {
    //     callback(mockError, null);
    //   });

    //   await postcontroller.deletePosts(mockReq, mockRes);

    //   expect(mockRes.status).toHaveBeenCalledWith(401);
    //   expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
    // });
  });

  describe('getcomment', () => {
    it('should return status code 200 and comment object on successful find', async () => {
      const mockReq = { params: { id: 'abc123' } };
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockComment = { _id: 'abc123', title: 'Test Name', des: 'original des' };

      jest.spyOn(postmodel, 'findById').mockImplementationOnce((id, callback) => {
        callback(null, mockComment);
      });
    });
  });
});
describe('createPost', () => {
  // Test case for successful response with given description
  test('returns post with status 201', async () => {
    const req = { body: { title: 'Test', des: 'Description' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const save = jest.fn().mockResolvedValue(req.body);
    postmodel.mockImplementation(() => {
      return { save };
    });
    await postcontroller.createPost(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
    expect(save).toHaveBeenCalled();
  });
});
describe('getPost', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should get the post with the specified id', async () => {
    const req = { params: { id: '123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const post = { _id: '123', title: 'Test Post', des: 'Test Description', date: expect.any(Date) };
    postmodel.findById.mockImplementationOnce((postId, callback) => {
      expect(postId).toEqual(req.params.id);
      callback(null, post);
    });
    const getPostResult = postcontroller.getPost(req, res);
    expect(postmodel.findById).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(post);
    expect(getPostResult).toEqual(undefined);
  });

  it('should handle error when getting post', async () => {
    const req = { params: { id: '123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const error = new Error('Error getting post');
    postmodel.findById.mockImplementationOnce((postId, callback) => {
      expect(postId).toEqual(req.params.id);
      callback(error);
    });
    const getPostResult = postcontroller.getPost(req, res);
    expect(postmodel.findById).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ message: error });
    expect(getPostResult).toEqual(undefined);
  });
})
});
