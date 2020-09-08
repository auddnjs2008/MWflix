import React from "react";
import SeriesPresenter from "./SeriesPresenter";
import { series } from "../../API";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id, sId },
      },
      history: { push },
    } = this.props;

    const parsedId = parseInt(id);
    const parsedsId = parseInt(sId);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      ({ data: result } = await series.seriesDetail(parsedId, parsedsId));
    } catch (error) {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    return <SeriesPresenter result={result} error={error} loading={loading} />;
  }
}
