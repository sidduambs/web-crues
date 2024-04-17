declare module 'jquery';
import Link from "next/link";
import ToolsCard from "./components/Tools";
import { Grid, Typography } from "@mui/material";

export default function Home() {
  const toolsList = [
    {
      name: "1.Spatial Analysis",
      description: "Plottings of Crime locations and respective heat maps",
      link: "/spatial-analysis",
      image: "/images/spatial_analysis.png",
    },
    {
      name: "2.Beat wise distribution of crimes",
      description: "Analysis and visual representation of crime in specific beats",
      link: "/beat-wise",
      image: "/images/Beat-Wise.png",
    },
    {
      name: "3.Trend of occurrence of crimes",
      description: "Analysis and graphical plotting of crimes chronologically and seasonally",
      link: "/Trendofoccurance",
      image: "/images/third.png",
    },
    {
      name: "4.Prediction of criminal behavior",
      description: "Predicting the chances of any accused individual being a criminal as well as representing crimes by categories",
      link: "/criminalbehavior",
      image: "/images/crime analysis.png",
    },
    {
      name: "5.Prediction of vulnerable populations",
      description: "Predicting the chances of a crime occurring in any district as well as representing crime occurrence by categories",
      link: "/vulnerablepopulation",
      image: "/images/vul pop.png",
    },
    {
      name: "6.Beat wise ranking of crimes",
      description: "Ranking of beats by highest crime rate in selected district and year",
      link: "/beat-wise",
      image: "/images/beat du.png",
    },
    {
      name: "7.AI Model",
      description: "AI model that predicts spots where crimes are most likely to occur as well as police stations and hospitals nearby",
      link: "/AI-model",
      image: "/images/Ai pre.png",
    },
  ];

  return (
    <>
      <header style={{ padding: "10px 3px", height: "150px", textAlign: "center", background: "#35353f", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/images/logo.png" alt="Logo" style={{ width: "100px", height: "auto", marginRight: "10px" }} />
        <Typography variant="h3" style={{ margin: "0" }}>Predictive Crime Analysis Tools</Typography>
      </header>
      <Grid container spacing={2} style={{ padding: "20px" }}>
        {toolsList.map((el, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link href={el.link}>
              <div style={{ cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }}>
                <ToolsCard
                  name={el.name}
                  description={el.description}
                  image={el.image}
                />
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
      <footer style={{ padding: "20px", textAlign: "center", background: "black", color: "white" }}>
        <Typography variant="body1">&copy; Made By Web Crusaders </Typography>
      </footer>
    </>
  );
}
