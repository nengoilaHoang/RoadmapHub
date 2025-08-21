export default function Label({ text = "Sample Label" }) {
  return (
    <div className="custom-node label-node">
      <span>{text}</span>
    </div>
  );
}
