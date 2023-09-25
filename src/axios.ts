import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// interceptor to redirect to login on error
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const res = error.response;
    if (res.status == 401) {
      window.location.href = "http://localhost:3000/login";
    }
    console.error("API error" + res.status);
    return Promise.reject(error);
  }
);

export function getWishLists() {
  return axiosClient.get("/wishlists");
}

export function getWishListDetail(id: string) {
  return axiosClient.get(`/wishlist/${id}`);
}

export function updateWishList(id: string, input: any) {
  return axiosClient.put(`/wishlist/${id}`, input);
}

export function createWishList(input: any) {
  return axiosClient.post(`/wishlist/create`, input);
}

export function getGiftItems(id: string) {
  return axiosClient.get(`/giftitems/wishlist/${id}`);
}

export function createGiftItem(input: any) {
  return axiosClient.post(`/giftitems/`, input);
}

export function updateGiftItem(id: string, input: any) {
  return axiosClient.put(`/giftitems/${id}/`, input);
}

export function getUsers() {
  return axiosClient.get("/users");
}
