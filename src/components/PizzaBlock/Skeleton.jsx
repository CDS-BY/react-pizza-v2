import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={315}
    height={485}
    viewBox="0 0 315 485"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="130" r="125" /> 
    <rect x="0" y="330" rx="10" ry="10" width="280" height="88" /> 
    <rect x="25" y="282" rx="10" ry="10" width="230" height="27" /> 
    <rect x="125" y="438" rx="23" ry="23" width="155" height="45" /> 
    <rect x="0" y="447" rx="10" ry="10" width="90" height="27" />
  </ContentLoader>
)

export default Skeleton