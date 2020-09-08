import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: 300px;
  padding: 50px;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 70%;
`;

const Cover = styled.div`
  width: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const Title = styled.span`
  font-size: 15px;
`;
const Site = styled.a``;

const SeriesPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message color="#e74c3c" text={error} />
  ) : (
    <Container>
      {result.episodes.map((episode) => (
        <Wrapper>
          <Cover
            bgImage={
              episode.still_path
                ? `https://image.tmdb.org/t/p/original${episode.still_path}`
                : require("../../assets/noPosterSmall.png")
            }
          />
          <Title>{episode.name}</Title>
        </Wrapper>
      ))}
    </Container>
  );

export default SeriesPresenter;
