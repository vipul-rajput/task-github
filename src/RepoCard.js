import React from "react";
import { Card, Button } from "react-bootstrap";
export default function RepoCard(props) {
  // 	basic details of the repo like:
  // 1) Repo name: (name/full_name)
  // 2) Description: (description)
  // 3) Owner name: (owner.login)
  // 4) Stars count: (stargazers_count)
  // 5) Number of forks: (forks_count)
  // 6) Language: (language)
  // Functionalities to be implemented
  const data = props.data;
  return (
    <Card className="repo-card text-center">
      <Card.Title>{data.name}</Card.Title>
      <center>
        <Card.Img variant="top" src={data.owner.avatar_url} />
      </center>
      <Card.Body>
      
        <Card.Text className="repos-des">{data.description}</Card.Text>
        <div className="dev">
          Developed By: <span>{data.owner.login}</span>
        </div>
        <div className="d-flex forks justify-content-between">
          <div><span>{data.forks_count}</span> Forks</div>
          <div><span>{data.stargazers_count}</span> Stars</div>
          </div>
        { data.language? <div><b>Language: </b>{data.language}</div>:<div></div>}
        <Button
        className="open-btn"
          onClick={() => {
            window.open(data.html_url, "_blank");
          }}
          variant="primary"
        >
          Open In Github
        </Button>
      </Card.Body>
    </Card>
  );
}
