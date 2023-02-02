import Overview from "./Overview";
import { Route, MemoryRouter } from "react-router-dom";
import ReactDOMServer from "react-dom/server";

const currentUser = {
  id: 1,
};

const sessionUser = {
  id: 2,
};

it(`renders user data `, async () => {
  const component = ReactDOMServer.renderToString(
    <MemoryRouter initialEntries={[`/ProfilePage/1/about`]}>
      <Route path="/ProfilePage/:id/about">
        <Overview currentUser={currentUser} sessionUser={sessionUser} />
      </Route>
    </MemoryRouter>
  );
  expect(component).toBe(
    '<div style="display:flex;flex-direction:column;justifty-content:space-evenly;padding:10px;height:30%"><div style="display:flex;justify-content:space-between"><p></p></div><div style="display:flex;justify-content:space-between"><p></p></div><div style="display:flex;justify-content:space-between"><p></p></div><div style="display:flex;justify-content:space-between"><p></p></div><div style="display:flex;justify-content:space-between"><p></p></div></div>'
  );
});
