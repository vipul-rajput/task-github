import react, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import RepoCard from "./RepoCard";
import { Languages, sortOption, orderOption } from "./dropdownList";
import { Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Loader from "./Loader";
function App() {
  const getRepos = async (pageNo) => {
    // https://api.github.com/search/repositories?q=language:Javascript&sort=stars&order=desc&page=1&per_page=10
    pageNo = pageNo | 1;
    if (searchText && searchText.length > 1) {
      const baseURL = "https://api.github.com/search/repositories?";
      let params = `q=${searchText}`;
      params += filter.language ? `+language:${filter.language}` : "";
      params += filter.sort ? `&sort=${filter.sort}` : "";
      params += filter.order ? `&order=${filter.order}` : "";
      params += `&page=${pageNo}&per_page=12`;
      const res = await axios
        .get(baseURL + params)
        .catch((err) => console.log(err));
      setRepoData(res.data);
    } else {
      alert("Input text to search");
    }
  };
  const [loader, setLoader] = useState(false);
  const handlePageClick = (e) => {
    // alert(e.selected+1)
    getRepos(e.selected + 1);
  };
  const [repoData, setRepoData] = useState();
  const [searchText, setSearchText] = useState();
  const [filter, setFilter] = useState({ sort: "", order: "", language: "" });
  useEffect(() => {
    if (searchText && searchText.length > 1) getRepos();
  }, [filter, searchText]);
  return (
    <div>
      <center>
        <h1>Github Repository Search</h1>
        <input
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="search-input"
        ></input>
        <br />
        <br></br>
        <button className="btn btn-primary mb-4" onClick={() => getRepos()}>Search</button>
      </center>
    { searchText&&searchText.length>1? <Container>
        <center>
          {" "}
          <select
            onChange={(e) => setFilter({ ...filter, language: e.target.value })}
          >
            {Languages.map((language, indx) => {
              return (
                <option value={language.value} key={indx}>
                  {language.label}
                </option>
              );
            })}
          </select>
          <select
            onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
          >
            {sortOption.map((sort, indx) => {
              return (
                <option value={sort.value} key={indx}>
                  {sort.label}
                </option>
              );
            })}
          </select>
          <select
            onChange={(e) => setFilter({ ...filter, order: e.target.value })}
          >
            {orderOption.map((order, indx) => {
              return (
                <option value={order.value} key={indx}>
                  {order.label}
                </option>
              );
            })}
          </select>
        </center>
        <div className="row justify-content-center">
          {repoData?.total_count > 0 ? (
            repoData?.items.map((data, indx) => {
              return (
                <div className="col-3" key={indx}>
                  <RepoCard data={data} />
                </div>
              );
            })
          ) : searchText?.length > 0 ? (
            <div className="text-center">
              No Repository Found for"{searchText}"
            </div>
          ) : (
            <div className="text-center">Search first</div>
          )}
        </div>
        <div className="d-flex justify-content-center">
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={Math.floor(repoData?.total_count / 12)}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </Container>:<div></div>}
    </div>
  );
}

export default App;
