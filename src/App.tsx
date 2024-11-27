import styled from "styled-components";
import "./App.css";

const CV = styled.div`
  display: flex;
  border: 1px solid black;
  height: fit-content;
`;

const CVLeft = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f4f5f7;
  padding: 62px 23px 40px 36px;
  height: fit-content;

  img {
    width: 210px;
    height: 210px;
    margin-bottom: 36px;
    align-self: center;
  }
`;

const Header = styled.h2`
  font-weight: 700;
  font-size: 23px;
  line-height: 18px;
  margin: 0;
  margin-bottom: 16px;
  color: #6ed698;
`;

const P = styled.p`
  font-family: "Source Sans 3";
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #4b5563;
  max-width: 290px;
  margin: 0;
  margin-bottom: 29px;
`;

const B = styled.b`
  font-weight: 700;
`;

const Double = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 26px;
  margin-bottom: 25px;
`;

const P2 = styled.p`
  font-family: "Source Sans 3";
  font-size: 18px;
  line-height: 25px;
  font-weight: 400;
  color: #4b5563;
  margin: 0;
`;

const Mini = styled.p`
  font-family: "Source Sans 3";
  font-size: 13px;
  line-height: 13px;
  font-weight: 300;
  color: #4b5563;
  margin: 0;
  margin-top: 12px;
  max-width: 282px;
`;

const CVRight = styled.div`
  height: 1577px;
  width: 712px;
  background-color: white;
`;

function App() {
  return (
    <>
      <CV>
        <CVLeft>
          <img src="./avatar.svg" alt="avatar" />
          <Header>ABOUT ME</Header>
          <P>
            I am a masters student in Product Service System Design at
            Politecnico di Milano. With a strong commitment to learning, I
            possess an international perspective and am dedicated to advancing
            humanitarian and sustainable development through innovative product
            and service design. My passion lies in creating impactful,
            human-centered solutions by employing in-depth research, design
            thinking methodologies, and co-creation. I aim to integrate
            business, design, and technology to drive meaningful change.
          </P>
          <Header>EDUCATION</Header>
          <P>
            <B>Politecnico di Milano & Tongji University</B> <br /> (2023-2025){" "}
            <br />
            Double Degree Masters in Product Service System Design <br />
            Society : Entrepreneurship Club <br />
            <br />
            <B>Institut Teknologi Bandung</B> (2018-2023) <br />
            Bachelor in Industrial Design <br />
            GPA : 3.86/4.0 <br />
            Society : Industrial Design Student Society, University Student
            Council, ITBJazz, Japanese Cultural Club <br />
            <br />
            <B>University of Twente </B>(2021-2022) <br />
            Geographic Information Science & Earth Observation Minor <br />
            Society : Foton Arts <br />
            <br /> <B>Hokkaido University</B> (2022) <br /> HUSTEP Program :
            Sustainable Development Education & Goals
          </P>
          <Header>SKILLS</Header>
          <Double>
            <P2>
              Design Thinking <br /> Digital Sketching <br /> 3D Modelling{" "}
              <br />
              HTML & CSS
            </P2>
            <P2>
              Design Research <br />
              Videography <br />
              Graphic Design <br /> Public Speaking
            </P2>
          </Double>
          <Header>TOOLS</Header>
          <Double>
            <P2>
              Figma <br />
              Miro <br />
              Adobe Illustrator <br />
              Adobe Lightroom <br />
            </P2>
            <P2>
              AutoCAD <br />
              Fusion 360 <br />
              Keyshot <br />
              VS Code <br />
            </P2>
          </Double>
          <Header>CERTIFICATION</Header>
          <P2>IELTS Band 8 (CEFR C1 Level)</P2>
          <Mini>
            I authorize the processing of personal data contained in my
            curriculum vitae based on art. 13 GDPR 679/16.
          </Mini>
        </CVLeft>
        <CVRight>
          <h1>Kezia Jane Rivan</h1>
        </CVRight>
      </CV>
    </>
  );
}

export default App;
