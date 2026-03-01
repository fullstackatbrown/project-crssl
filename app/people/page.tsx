"use client";
import Image from "next/image";
import icon from "../favicon.ico";

const labels = [
  "All",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const generic_people = [
  {
    name: "FIRSTNAME LASTNAME",
    titles: ["Job Title", "Another Job Title"],
    focuses: "Topic of Interest A, Topic of Interest B",
    link: "",
    image: "",
  },
];

function Buttons() {
  return (
    <fieldset>
      {labels.map((label) => (
        <label key={`${label} button label`}>
          <input
            name="name letters"
            key={`${label} button`}
            type="radio"
            defaultChecked={label === "All"}
          />
          {label}
        </label>
      ))}
    </fieldset>
  );
}

function Person() {
  return (
    <article>
      <div>
        {generic_people.map((person) => (
          <a
            key={`${person.name} link`}
            className="person links"
            href={person.link}
          >
            <Image alt="generic image" src={icon} width={100} height={100} />
            <div>
              <h2 className="name">{person.name}</h2>
              {person.titles.map((title, index) => (
                <span key={`${person.name} ${title} ${index}`}>{title}</span>
              ))}
              <p>{person.focuses}</p>
            </div>
          </a>
        ))}
      </div>
      <div>
        <h3>Something Recent</h3>
        <a href="">Link</a>
        <time dateTime="01-01-01">January 1, 2001</time>
      </div>
    </article>
  );
}

function SearchInput() {
  return (
    <div>
      <input type="search" className="border-solid border" />
      <button onClick={Search} className="border-solid border">
        {" "}
        Search{" "}
      </button>
    </div>
  );
}

function Search() {}

function InterviewReq() {
  return (
    <div>
      <button onClick={Interview} className="border-solid border">
        Request Interview
      </button>
    </div>
  );
}

function Interview() {}

function ConsultReq() {
  return (
    <div>
      <button onClick={Consult} className="border-solid border">
        Request Consulting
      </button>
    </div>
  );
}

function Consult() {}

export default function People() {
  return (
    <div>
      <h1>People</h1>
      <p>Some blurb</p>
      <InterviewReq />
      <ConsultReq />
      <SearchInput />
      <Buttons />
      <Person />
    </div>
  );
}
