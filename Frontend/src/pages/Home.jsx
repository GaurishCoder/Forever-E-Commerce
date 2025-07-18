import Hero from "../components/Hero.jsx";
import LatestCollection from "../components/LatestCollection.jsx";
import BestSeller from "../components/BestSeller.jsx";
import Policy from "../components/Policy.jsx";
import Subscribe from "../components/Subscribe.jsx";
function Home() {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <Policy />
      <Subscribe />
    </div>
  );
}

export default Home;
