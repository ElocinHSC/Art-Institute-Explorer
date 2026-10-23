type NavigationProps = {
  activeView: "search" | "gallery";
  galleryCount: number;
  onChangeView: (view: "search" | "gallery") => void;
};

function Navigation({
  activeView,
  galleryCount,
  onChangeView,
}: NavigationProps) {
  return (
    <header className="site-header">
      <button className="brand" onClick={() => onChangeView("search")}>
        ART EXPLORER
      </button>

      <nav className="site-nav" aria-label="Main navigation">
        <button
          className={activeView === "search" ? "nav-link active" : "nav-link"}
          onClick={() => onChangeView("search")}
        >
          Discover
        </button>
        <button
          className={activeView === "gallery" ? "nav-link active" : "nav-link"}
          onClick={() => onChangeView("gallery")}
        >
          My Gallery <span className="gallery-count">{galleryCount}</span>
        </button>
      </nav>
    </header>
  );
}

export default Navigation;
