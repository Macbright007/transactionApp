import React, { useEffect, useState } from "react";
import RecordCard from "./recordCard.js";

export default function SearchRecords() {
  const [profiles, setProfiles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterCreditCardType, setFilterCreditCardType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const displayProfiles = useFilterProfiles(
    profiles,
    searchText,
    filterGender,
    filterCreditCardType
  );
  const profilesPerPage = 20;

  useEffect(() => {
    async function fetchRecords() {
      const url = "https://api.enye.tech/v1/challenge/records";
      try {
        const res = await fetch(url);
        const data = await res.json();
        setProfiles(data.records.profiles);
      } catch (err) {
        console.error(err);
      }
    }
    fetchRecords();
  }, []);

  const pages = usePagination(profiles.length, profilesPerPage);

  return (
    <>
      <form className="form">
        <label className="label" htmlFor="query">
          <b>Transaction Detail:</b>
        </label>       
        <button className="button" type="submit" onChange={(e) => setSearchText(e.target.value)}>
          Search
        </button>
      </form>
      <select
        className="filter-by-gender"
        value={filterGender}
        onChange={(e) => setFilterGender(e.target.value)}
      >
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="Prefer to skip">Prefer to skip</option>
      </select>
      <select
        className="filter-by-credit"
        value={filterCreditCardType}
        onChange={(e) => setFilterCreditCardType(e.target.value)}
      >
        <option value="">All</option>
        <option value="MasterCard">MasterCard</option>
        <option value="American Express">American Express</option>
      </select>
      <ProfileList
        profiles={displayProfiles}
        currentPage={currentPage}
        limit={profilesPerPage}
      />
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

function ProfileList({ profiles, currentPage, limit }) {
  return (
    <div className="card-list">
      {profiles
        .slice(limit * (currentPage - 1), limit * currentPage)
        .map((profile) => (
          <RecordCard detail={profile} key={profile.MacAddress} />
        ))}
    </div>
  );
}

// customm hooks. use can put these in seperate files;
// i.e useFilterProfiles.js
function useFilterProfiles(profiles, searchText, gender, CreditCardType) {
  const [filtered, setFilteredProfiles] = useState([]);
  useEffect(() => {
    let filterResult = profiles.filter((profile) => {
      let namefound = true;
      let genderfound = true;
      let cardfound = true;
      if (searchText)
        namefound =
          `${profile.FirstName} ${profile.LastName}`.indexOf(searchText) > -1;
      if (gender)
        genderfound = profile.Gender.toLowerCase() === gender.toLowerCase();
      if (CreditCardType)
        cardfound =
          profile.CreditCardType.toLowerCase() === CreditCardType.toLowerCase();
      return namefound && genderfound && cardfound;
    });
    setFilteredProfiles(filterResult);
  }, [profiles, searchText, gender, CreditCardType]);
  return filtered;
}

// i.e usePagination.js
function usePagination(total, limit) {
  const [pages, setPages] = useState(0);

  useEffect(() => {
    setPages(total > 0 ? Math.ceil(total / limit) : 1);
  }, [total, limit]);

  return pages;
}

// Pagination.js
function Pagination({ pages, currentPage, setCurrentPage }) {
  return (
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      {pages > 1 &&
        Array(pages - 1)
          .fill("")
          .map((_, i) => (
            <button onClick={() => setCurrentPage(i + 1)}> {i + 1} </button>
          ))}
      <button
        disabled={currentPage === pages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
