import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { WishListCard } from "./WishListCard";

// Mock the useNavigate function
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("WishListCard component", () => {
  const wishlist = {
    wish_list_id: 1,
    name: "Test Wishlist",
    description: "Test Description",
  };

  it("renders wishlist name and description", () => {
    render(
      <MemoryRouter>
        <WishListCard wishlist={wishlist} />
      </MemoryRouter>
    );

    const nameElement = screen.getByText("Test Wishlist");
    const descriptionElement = screen.getByText("Test Description");

    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
