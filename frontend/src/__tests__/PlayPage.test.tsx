import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PlayPage } from "../presentation/pages/PlayPage";

describe("PlayPage", () => {
  it("nightmare-a の再生中テキストが表示される", () => {
    render(
      <MemoryRouter initialEntries={["/play/nightmare-a"]}>
        <Routes>
          <Route path="/play/:id" element={<PlayPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/悪夢を再生中: nightmare-a/)).toBeInTheDocument();
  });
});
