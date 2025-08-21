import { Handle } from '@xyflow/react';
import './Topic.css';
export default function Topic() {
  return (
    <div className="custom-node">
      <div>Topic name</div>

      {/* TOP */}
      <Handle type="source" position="top" id="top-source" style={{ left: '45%' }} />
      <Handle type="target" position="top" id="top-target" style={{ left: '55%' }} />

      {/* BOTTOM */}
      <Handle type="source" position="bottom" id="bottom-source" style={{ left: '45%' }} />
      <Handle type="target" position="bottom" id="bottom-target" style={{ left: '55%' }} />

      {/* LEFT */}
      <Handle type="source" position="left" id="left-source" style={{ top: '40%' }} />
      <Handle type="target" position="left" id="left-target" style={{ top: '60%' }} />

      {/* RIGHT */}
      <Handle type="source" position="right" id="right-source" style={{ top: '40%' }} />
      <Handle type="target" position="right" id="right-target" style={{ top: '60%' }} />
    </div>
  );
}
