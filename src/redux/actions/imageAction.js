import DefaultApi from "api/Api";
import { AWAIT_MARKER } from "redux-await";
export const GET_IMAGE_LIST = "IMAGE/get-image-list";
export const LOAD_MORE_IMAGE_LIST = "IMAGE/load-more-image-list";
export const SET_CURRENT_IMAGE = "IMAGE/set-current-image";
export const RESTORE_ALL_IMAGE = "IMAGE/restor-image";
export const DELETE_IMAGE = "IMAGE/delete-image";
export const DELETE_ALL_IMAGE = "IMAGE/delete-all-image";
export const CLEAR_CURRENT_IMAGE = "IMAGE/clear-current-image";
export const PRINT_IMAGE = "IMAGE/print-image";

export function getImageList({ type, page, itemPerPage, storeId }) {
  return {
    type: GET_IMAGE_LIST,
    AWAIT_MARKER,
    payload: {
      getImageList: DefaultApi.getImageList({ type, page, itemPerPage, storeId })
    }
  };
}

export function loadMoreImageList({ type, page, itemPerPage, storeId }) {
  return {
    type: LOAD_MORE_IMAGE_LIST,
    AWAIT_MARKER,
    payload: {
	    loadMoreImageList: DefaultApi.getImageList({ type, page, itemPerPage, storeId })
    }
  };
}

export function setCurrentImage(image) {
  return {
    type: SET_CURRENT_IMAGE,
    image
  };
}

export function printImage(imageId) {
  DefaultApi.printImage(imageId);
  return {
    type: PRINT_IMAGE,
    imageId
  };
}

export function clearCurrentImage() {
  return {
    type: CLEAR_CURRENT_IMAGE
  };
}

export function deleteImage(imageId){
  DefaultApi.deleteImage(imageId);
  return {
    type: DELETE_IMAGE,
	  imageId
  }
}

export function deleteAllImage(){
	DefaultApi.deleteAllImage();
  return {
    type: DELETE_ALL_IMAGE
  }
}

export function restoreAllImage(){
  DefaultApi.restoreAllImage();
  return {
    type: RESTORE_ALL_IMAGE
  }
}

export default {
  getImageList,
  loadMoreImageList,
  setCurrentImage,
  clearCurrentImage,
  printImage,
  deleteImage,
	deleteAllImage
};
