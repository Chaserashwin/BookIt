import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import Experiences from "../utils/Experiences";
import SearchContext from "../utils/SearchContext";
import axios from "axios";
import Shimmer from "../components/Shimmer";

const Home = () => {
  const { search } = useContext(SearchContext);
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BASE_URL;
        // console.log("Fetching from:", apiUrl);

        const res = await axios.get(`${apiUrl}/experiences`);
        // console.log("Response:", res);

        setExperiences(res.data);
        setFilteredExperiences(res.data);
      } catch (error) {
        console.error("error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // useEffect(() => {
  //   setExperiences(Experiences);
  //   setFilteredExperiences(Experiences);
  // }, [Experiences]);

  useEffect(() => {
    const filterExp = experiences.filter((exp) =>
      exp.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredExperiences(filterExp);
  }, [search, experiences]);

  if (loading) return <Shimmer />;
  return (
    <div className="grid grid-cols-4 top-[135px] left-[124px] gap-6 pb-20 absolute">
      {filteredExperiences.map((experience) => (
        <Card data={experience} key={experience.id} />
      ))}
    </div>
  );
};

export default Home;
