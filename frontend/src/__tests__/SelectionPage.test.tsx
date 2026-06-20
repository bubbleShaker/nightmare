import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SelectionPage } from "../presentation/pages/SelectionPage";

describe("SelectionPage", () => {
  it("悪夢のタイトルが表示される", async () => {
    render(
      <MemoryRouter>
        <SelectionPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("化け猫の悪夢")).toBeInTheDocument();
      expect(screen.getByText("浮遊・落下の悪夢")).toBeInTheDocument();
    });
  });

  it("見出し『悪夢シアター』が表示される", async () => {
    render(
      <MemoryRouter>
        <SelectionPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "悪夢シアター" })).toBeInTheDocument();
  });
});
