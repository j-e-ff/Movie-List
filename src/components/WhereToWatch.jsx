import { useEffect, useState } from "react";
import { getMovieProviders, getShowProviders } from "../services/api";
import "../css/WhereToWatch.css";
import Justwatch from "../assets/Justwatch.svg";
import { Link } from "react-router-dom";

const WhereToWatch = ({ movieId, type }) => {
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProviders() {
      try {
        const results = await (type === "movie"
          ? getMovieProviders(movieId)
          : getShowProviders(movieId));
        console.log("API Results:", results);
        console.log("US Providers:", results["US"]);
        setProviders(results["US"]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadProviders();
  }, [movieId, type]);

  if (loading) return <div>Loading providers...</div>;

  const renderProvidersSection = (title, providersList, providerLink) => {
    if (!providersList || providersList.length === 0) return null;

    return (
      <div className="providers-section">
        <span className="provider-title">
          <strong>{title}</strong>
        </span>
        <div className="provider-container">
          {providersList.map(
            (provider) => (
              console.log("Provider:", provider),
              console.log("Provider Link:", provider.link),
              (
                <Link
                  key={provider.provider_id}
                  to={providerLink || "#"}
                  className="provider-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{provider.name}</span>
                  <img
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.name}
                  />
                </Link>
              )
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="providers-section">
      <h2 className="left-title">JustWatch</h2>
      <script async src="https://widget.justwatch.com/justwatch_widget.js"></script>
      {providers &&
      (providers.flatrate?.length > 0 ||
        providers.free?.length > 0 ||
        providers.rent?.length > 0 ||
        providers.buy?.length > 0) ? (
        <div>
          {renderProvidersSection(
            "Streaming: ",
            providers.flatrate,
            providers.link
          )}
          {renderProvidersSection("Free", providers.free, providers.link)}
          {renderProvidersSection("Rent: ", providers.rent, providers.link)}
          {renderProvidersSection("Purchase: ", providers.buy, providers.link)}
        </div>
      ) : (
        <div>
          <p>Streaming Information Not Found</p>
        </div>
      )}
    </div>
  );
};

export default WhereToWatch;
