export default function Answer(props) {
  const styles = {
    backgroungColor: props.isSelected ? "grey" : "white",
  };
  return <p style={styles}>{props.content}</p>;
}
