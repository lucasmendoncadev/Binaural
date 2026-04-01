import * as icons from "lucide-react";
import { LucideProps } from "lucide-react";

const iconMap: Record<string, React.FC<LucideProps>> = {
  "book-open": icons.BookOpen,
  "notebook-pen": icons.NotebookPen,
  crosshair: icons.Crosshair,
  brain: icons.Brain,
  "pen-tool": icons.PenTool,
  "bar-chart-2": icons.BarChart2,
  lightbulb: icons.Lightbulb,
  cloud: icons.Cloud,
  "flower-2": icons.Flower2,
  sunset: icons.Sunset,
  moon: icons.Moon,
};

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = iconMap[name] || icons.Circle;
  return <IconComponent {...props} />;
}
