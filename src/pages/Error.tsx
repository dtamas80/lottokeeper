import Header from "../components/Header/Header";
import Title from "../components/UI/Title";

const ErrorPage = () => {
  return <>
    <Header />
    <main>
      <Title>Az oldal nem található</Title>
      <p>Térjen vissza a főoldalra.</p>
    </main>
  </>
};

export default ErrorPage;