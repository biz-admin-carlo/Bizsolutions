import { ReactTyped } from "react-typed";

const Typings = () => (
  <div className="text-italic">
    <h4>
        <ReactTyped strings={[
            "Discover Local Businesses",
            "Showcase your Local Businesses",
            "Make it available in larger audience",
        ]} 
        typeSpeed={40} 
        backSpeed={50}
        loop
        />
    </h4>
  </div>
);

export default Typings;