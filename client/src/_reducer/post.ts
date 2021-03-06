import produce from "immer";
import { Action } from "./user";

export type ImageType = {
  success: boolean;
  image: string | null;
  fileName: string | null;
};

export type ProductType = {
  createdAt: string;
  description: string;
  images: Array<ImageType>;
  option: string;
  price: number;
  title: string;
  updatedAt: string;
  writer: {
    _id: string;
    name: string;
    email: string;
  };
  _id: string;
};
interface StateType {
  mainPosts: {
    success: boolean;
    productInfo: Array<ProductType>;
  };
  imagePaths: Array<ImageType>; // Preview image path
  addPostErrorReason: string; // Post upload error reason
  isAddingPost: boolean; // Post uploading
  addedPost: boolean; // Post upload success
  uploadImagesLoading: boolean;
  uploadImagesDone: boolean;
  uploadImagesError: string | null;
  hasMorePost: boolean;
}

export const initialState: StateType = {
  mainPosts: { success: false, productInfo: [] },
  imagePaths: [], // Preview image path
  addPostErrorReason: "", // Post upload error reason
  isAddingPost: false, // Post uploading
  addedPost: false, // Post upload success
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  hasMorePost: false
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const REMOVE_IMAGE = "REMOVE_IMAGE";

export const LOAD_MAIN_POSTS_REQUEST = "LOAD_MAIN_POSTS_REQUEST";
export const LOAD_MAIN_POSTS_SUCCESS = "LOAD_MAIN_POSTS_SUCCESS";
export const LOAD_MAIN_POSTS_FAILURE = "LOAD_MAIN_POSTS_FAILURE";

const reducer = (state = initialState, action: Action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST: {
        draft.isAddingPost = true;
        draft.addPostErrorReason = "";
        draft.addedPost = false;
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.isAddingPost = false;
        draft.mainPosts.productInfo.unshift(action.data);
        draft.addedPost = true;
        draft.imagePaths = [];
        break;
      }
      case ADD_POST_FAILURE: {
        draft.isAddingPost = false;
        draft.addPostErrorReason = action.error;
        break;
      }
      case UPLOAD_IMAGES_REQUEST: {
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths.push(action.data);
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      }
      case REMOVE_IMAGE: {
        const index = action.index;
        draft.imagePaths.splice(index, 1);
        break;
      }
      case LOAD_MAIN_POSTS_REQUEST: {
        draft.hasMorePost = true;
        break;
      }
      case LOAD_MAIN_POSTS_SUCCESS: {
        draft.mainPosts = action.data;
        draft.hasMorePost = action.data.length === 10;
        break;
      }
      case LOAD_MAIN_POSTS_FAILURE: {
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default reducer;
