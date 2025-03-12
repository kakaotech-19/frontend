import { HR, Label } from "flowbite-react";
import TodakLogoSVG from "../svg/TodakLogoSVG";

const Logo: React.FC = () => {
  return (
    <div>
      <Label htmlFor="todak-title" className="flex items-center justify-center">
        <h1 id="todak-title" className="font-bold text-cyan-800">
          <div className="flex gap-2">
            <div className="flex items-center">
              <TodakLogoSVG />
            </div>
            <p className="text-6xl font-gamja">토닥토닥</p>
          </div>
        </h1>
      </Label>
      <HR className="mt-1 mb-2" />
      <Label className="text-sm font-medium text-cyan-700 flex justify-center">
        만화로 만나는 감성 SNS
      </Label>
    </div>
  );
};

export default Logo;
