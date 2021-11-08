import React from "react";
import ContactButton from "../../components/ContactButton/ContactButton";
import HomePost from "../../features/Post/components/HomePost/HomePost";
import Banner from "./Banner/Banner";
function Home() {
  return (
    <section className="home">
      <Banner />
      <HomePost />
      {/* <ContactButton /> */}
    </section>
  );
}

export default Home;
