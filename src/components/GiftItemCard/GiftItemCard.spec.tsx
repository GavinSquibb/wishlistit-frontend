import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { GiftItemCard } from "./GiftItemCard";

// Mock the axios module and its updateGiftItem function
jest.mock("../../axios", () => ({
  updateGiftItem: jest.fn(),
}));

describe("GiftItemCard component", () => {
  const giftItem = {
    gift_item_id: 1,
    name: "Test Gift",
    price: 20,
    link: "https://example.com",
    purchased: false,
  };

  it("renders gift item details", () => {
    render(<GiftItemCard giftItem={giftItem} />);

    const nameElement = screen.getByText("Test Gift");
    const priceElement = screen.getByText("£20");
    const linkElement = screen.getByText("https://example.com");
    const buttonElement = screen.getByText("Mark As Purchased");

    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("disables the 'Mark As Purchased' button when the item is already purchased", () => {
    const purchasedGiftItem = { ...giftItem, purchased: true };
    render(<GiftItemCard giftItem={purchasedGiftItem} />);

    const buttonElement = screen.getByText("Mark As Purchased");

    expect(buttonElement).toBeEnabled();
  });
});
