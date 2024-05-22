import { ReactTyped } from "react-typed";

const Typings = () => (
  <div className="text-secondary">
    <h4>
        <ReactTyped strings={[
            "The Perfect Plan For You!",
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