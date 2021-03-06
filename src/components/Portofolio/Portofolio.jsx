import "./portofolio.scss";
import PortfolioList from "./PortofolioList/PortfolioList";
import Project from "./Project/Project";
import { useState } from "react";
import { projectsList, sectionsList, fetchSectionList, fetchProjectsBySection } from "../../data";
import { useEffect } from "react";
import { useRef } from "react";

const Portofolio = () => {
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false)
  
  //const projectListElem = useRef();    

  //const list = fetchSectionList(setSections);
  useEffect(() => {
    fetchSectionList(setSections);
    if(sections) setSelected(sections[0])
   },[])
  
  useEffect(() => {
    fetchProjectsBySection(selected, setData, setLoading);
  }, [selected]);

//todo on section change, old projects are renderedagain for a short time

  return (
    <div className="portofolio" id="portofolio">
      <h1>Portofolio</h1>
      <ul>
        {sections ? sections.map(item => (
          <PortfolioList
            title={item}
            id={item}
            active={selected === item}
            setSelected={setSelected}
            key={item}
            setLoading={setLoading}
          />
        )) : <h1>Loading...</h1>}
      </ul>
      <div className="container" >
        {!loading ? data.map((x) => (
          <Project key={x.id} img={x.img} title={x.name} description={x.description} />
        )) : <h1>Loading...</h1>}
      </div>
    </div>
  );
};

export default Portofolio;
