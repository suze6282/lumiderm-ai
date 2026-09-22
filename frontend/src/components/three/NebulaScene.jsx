import FluidSimulation from './FluidSimulation.jsx';

export default function NebulaScene({ tier = 'desktop', paused = false }) {
  return <FluidSimulation tier={tier} paused={paused} />;
}
