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
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const SubCover = styled.div`
  width: 50px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 70px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Site = styled.a`
  width: 15px;
  height: 15px;
  background-color: yellow;
  color: black;
  padding: 1px;
  font-weight: 700;
`;

const SeriesLink = styled.a``;

const Url = styled.li`
  margin-bottom: 20px;
`;

const Img = styled.img`
  width: auto;
  height: auto;
  max-width: 80px;
  max-height: 80px;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const CollectImg = styled.img`
  position: absolute;
  top: 32px;
  left: 0px;
  width: auto;
  height: auto;
  max-width: 150px;
  max-height: 150px;
  z-index: -1;
`;

const Company = styled.div`
  margin-top: 10px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
`;

const SubGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 100px;
`;
const Wrapper = styled.div`
  position: relative;
`;
const Production = styled.span``;
const SubTitle = styled.h4`
  font-size: 18px;
  padding: 10px 0px;
  color: #e74c3c;
  font-weight: 500;
`;
const DetailPresenter = ({ result, loading, error, isMovie }) =>
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
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date
                ? result.first_air_date.substring(0, 4)
                : "???"}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime
                ? result.runtime
                : result.episode_run_time
                ? result.episode_run_time[0]
                : "???"}{" "}
              min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} /`
                )}
            </Item>
            {result.imdb_id ? (
              <>
                <Divider>•</Divider>
                <Item>
                  <Site href={"https://www.imdb.com/title/" + result.imdb_id}>
                    Imdb
                  </Site>
                </Item>
              </>
            ) : (
              ""
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <GridWrapper>
            <Wrapper>
              <SubTitle>Production companies</SubTitle>
              <Production>
                {result.production_companies.length !== 0
                  ? result.production_companies.map((company, index) =>
                      company.logo_path ? (
                        <Img
                          src={
                            "https://image.tmdb.org/t/p/w300" +
                            company.logo_path
                          }
                        />
                      ) : (
                        <Company>{company.name}</Company>
                      )
                    )
                  : "No information"}
              </Production>
            </Wrapper>
            <Wrapper>
              <SubTitle>Production Countries</SubTitle>
              <Production>
                {result.production_countries
                  ? result.production_countries.map((country, index) =>
                      index === result.production_countries.length - 1
                        ? country.name
                        : `${country.name} / `
                    )
                  : "No information"}
              </Production>
            </Wrapper>
            <Wrapper>
              <SubTitle>Videos</SubTitle>
              <ul>
                {result.videos.results.length !== 0
                  ? result.videos.results.map((result) => (
                      <Url>
                        <Site
                          href={"https://www.youtube.com/watch?v=" + result.key}
                        >
                          {"https://www.youtube.com/watch?v=" + result.key}
                        </Site>
                      </Url>
                    ))
                  : "No information"}
              </ul>
            </Wrapper>
            {isMovie ? (
              <Wrapper>
                <SubTitle>Collections</SubTitle>
                {result.belongs_to_collection ? (
                  <>
                    <Site
                      href={"/#/collections/" + result.belongs_to_collection.id}
                    >
                      {" "}
                      Collection link
                    </Site>
                    <CollectImg
                      src={
                        "https://image.tmdb.org/t/p/w300" +
                        result.belongs_to_collection.poster_path
                      }
                    />
                  </>
                ) : (
                  "No information"
                )}
              </Wrapper>
            ) : (
              <Wrapper>
                <SubTitle>Series</SubTitle>
                <SubGridWrapper>
                  {result.seasons
                    ? result.seasons.map((season, index) => (
                        <SeriesLink
                          href={
                            "/#/series/" +
                            result.id +
                            "/season/" +
                            season.season_number
                          }
                        >
                          <SubCover
                            bgImage={
                              season.poster_path
                                ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                                : require("../../assets/noPosterSmall.png")
                            }
                          >
                            {" "}
                          </SubCover>
                          Series{index + 1}
                        </SeriesLink>
                      ))
                    : "No information"}
                </SubGridWrapper>
              </Wrapper>
            )}
          </GridWrapper>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
