"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  Search,
  Star,
  Code,
  Server,
  Globe,
  Zap,
  Clock,
  Check,
  Plus,
  SearchCheck,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { title } from "process";
const templates: TemplateOption[] = [
  {
    id: "react",
    name: "React",
    description:
      "A JavaScript library for building user interfaces with component-based architecture",
    icon: "/react.svg",
    color: "#61DAFB",
    popularity: 5,
    tags: ["UI", "Frontend", "JavaScript"],
    features: ["Component-Based", "Virtual DOM", "JSX Support"],
    category: "frontend",
  },
  {
    id: "nextjs",
    name: "Next.js",
    description:
      "The React framework for production with server-side rendering and static site generation",
    icon: "/nextjs-icon.svg",
    color: "#000000",
    popularity: 4,
    tags: ["React", "SSR", "Fullstack"],
    features: ["Server Components", "API Routes", "File-based Routing"],
    category: "fullstack",
  },
  {
    id: "express",
    name: "Express",
    description:
      "Fast, unopinionated, minimalist web framework for Node.js to build APIs and web applications",
    icon: "/expressjs-icon.svg",
    color: "#000000",
    popularity: 4,
    tags: ["Node.js", "API", "Backend"],
    features: ["Middleware", "Routing", "HTTP Utilities"],
    category: "backend",
  },
  {
    id: "vue",
    name: "Vue.js",
    description:
      "Progressive JavaScript framework for building user interfaces with an approachable learning curve",
    icon: "/vuejs-icon.svg",
    color: "#4FC08D",
    popularity: 4,
    tags: ["UI", "Frontend", "JavaScript"],
    features: ["Reactive Data Binding", "Component System", "Virtual DOM"],
    category: "frontend",
  },
  {
    id: "hono",
    name: "Hono",
    description:
      "Fast, lightweight, built on Web Standards. Support for any JavaScript runtime.",
    icon: "/hono.svg",
    color: "#e36002",
    popularity: 3,
    tags: ["Node.js", "TypeScript", "Backend"],
    features: [
      "Dependency Injection",
      "TypeScript Support",
      "Modular Architecture",
    ],
    category: "backend",
  },
  {
    id: "angular",
    name: "Angular",
    description:
      "Angular is a web framework that empowers developers to build fast, reliable applications.",
    icon: "/angular-2.svg",
    color: "#DD0031",
    popularity: 3,
    tags: ["React", "Fullstack", "JavaScript"],
    features: [
      "Reactive Data Binding",
      "Component System",
      "Virtual DOM",
      "Dependency Injection",
      "TypeScript Support",
    ],
    category: "fullstack",
  },
];
type TemplateSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    template: "REACT" | "NEXTJS" | "HONO" | "VUE" | "ANGULAR" | "EXPRESS";
    description?: string;
  }) => void;
};

interface TemplateOption {
  name: string;
  id: string;
  description: string;
  icon: string;
  color: string;
  popularity: number;
  tags: string[];
  features: string[];
  category: "frontend" | "backend" | "fullstack";
}

const TemplateSelectionModal = ({
  isOpen,
  onClose,
  onSubmit,
}: TemplateSelectionModalProps) => {
  const [step, setStep] = useState<"select" | "configure">("select");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<
    "frontend" | "backend" | "all" | "fullstack"
  >("all");
  const [projectName, setProjectName] = useState("");
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      category === "all" || template.category === category;
    return matchesCategory && matchesSearch;
  });
  const handleBack = () => {
    setStep("select");
  };

  const handleCreateProject = () => {
    if (selectedTemplate) {
      const templateMap: Record<
        string,
        "REACT" | "NEXTJS" | "EXPRESS" | "HONO" | "VUE" | "ANGULAR"
      > = {
        react: "REACT",
        nextjs: "NEXTJS",
        express: "EXPRESS",
        hono: "HONO",
        vue: "VUE",
        angular: "ANGULAR",
      };
      const template = templates.find((t) => t.id === selectedTemplate);
      onSubmit({
        title: projectName || `New ${template?.id} Project`,
        template: templateMap[selectedTemplate],
        description: template?.description,
      });
      onClose();
      setStep("select");
      setProjectName("");
      setSearchQuery("");
      setSelectedTemplate(null)
    }
  };
  const renderStars = (num: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={
          i < num ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }
      />
    ));
  };
  const handleContinue = () => {
    if (selectedTemplate) {
      setStep("configure");
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onClose();
        setCategory("all");
        setStep("select");
        setSearchQuery("")
        setProjectName("");
        setSelectedTemplate(null);
      }}
    >
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        {step === "select" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-red font-bold flex items-center gap-2">
                <Plus className="text-red" size={24} />
                Select a Template
              </DialogTitle>
              <DialogDescription>
                Choose a template to create your new playground
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6 py-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 outline-none"
                    size={18}
                  />
                  <Input
                    className="pl-10"
                    placeholder="search templates"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs
                  defaultValue="all"
                  className="w-full sm:w-auto "
                  onValueChange={(value) => setCategory(value as any)}
                >
                  <TabsList className="grid grid-cols-4 w-full sm:w-[400px]">
                    <TabsTrigger value="all">all</TabsTrigger>
                    <TabsTrigger value="fullstack">Fullstack</TabsTrigger>
                    <TabsTrigger value="frontend">Frontend</TabsTrigger>
                    <TabsTrigger value="backend">Backend</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <RadioGroup
                value={selectedTemplate || ""}
                onValueChange={handleSelectTemplate}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTemplates.length > 0 ? (
                    filteredTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`relative flex p-6 border rounded-lg cursor-pointer
                          transition-all duration-300 hover:scale-[1.02]
                          ${
                            selectedTemplate === template.id
                              ? "border-[#E93F3F]  shadow-[0_0_0_1px_#E93F3F,0_8px_20px_rgba(233,63,63,0.15)]"
                              : "hover:border-[#E93F3F] shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
                          }`}
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        <div className="absolute top-4 right-4 flex gap-1">
                          {renderStars(template.popularity)}
                        </div>

                        {selectedTemplate === template.id && (
                          <div className="absolute top-2 left-2 bg-[#E93F3F] text-white rounded-full p-1">
                            <Check size={14} />
                          </div>
                        )}

                        <div className="flex gap-4">
                          <div
                            className="relative w-16 h-16 shrink-0 flex items-center justify-center rounded-full"
                            style={{ backgroundColor: `${template.color}15` }}
                          >
                            <Image
                              src={template.icon || "/placeholder.svg"}
                              alt={`${template.name} icon`}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>

                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold">
                                {template.name}
                              </h3>
                              <div className="flex gap-1">
                                {template.category === "frontend" && (
                                  <Code size={14} className="text-blue-500" />
                                )}
                                {template.category === "backend" && (
                                  <Server
                                    size={14}
                                    className="text-green-500"
                                  />
                                )}
                                {template.category === "fullstack" && (
                                  <Globe
                                    size={14}
                                    className="text-purple-500"
                                  />
                                )}
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3">
                              {template.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                              {template.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-1 border rounded-2xl"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <RadioGroupItem
                          value={template.id}
                          id={template.id}
                          className="sr-only"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center p-8 text-center">
                      <Search size={48} className="text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium">
                        No templates found
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}
                </div>
              </RadioGroup>
              <div className="flex justify-between mt-4 top-4 border-t pt-4  gap-3 ">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={14} className="mx-1" />
                  <span>
                    {selectedTemplate
                      ? "Estimated time 2-3 mins"
                      : "select a template"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant={"outline"}
                    onClick={onClose}
                    className="bg-red-400"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleContinue}
                    className="bg-red-400  hover:bg-red-600"
                  >
                    Continue <ChevronRight size={14} className="text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-red-400 font-bold">
                Configure Your Project
              </DialogTitle>
              <DialogDescription>
                {
                  templates.find((template) => template.id === selectedTemplate)
                    ?.name
                }{" "}
                Project Configuration
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col py-3 gap-6">
              <div className="flex flex-col gap-3">
                <Label htmlFor="my-project">Project Name</Label>
                <Input
                  id="my-project"
                  value={projectName}
                  placeholder="my crazy project"
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="border-2 border-red-500  p-4 gap-3 rounded-lg  ">
                <h3 className="font-bold text-xl text-red">
                  Features Selected
                </h3>
                <div className="grid grid-cols-1 mt-4 sm:grid-cols-2">
                  {templates
                    .find((template) => template.id === selectedTemplate)
                    ?.features.map((feature) => (
                      <div className="flex items-center gap-2" key={feature}>
                        <Zap size={14} className="text-red-400 mr-2" />
                        <span className=" text-sm">{feature}</span>
                      </div>
                    ))}
                </div>
                <div className="flex justify-between gap-3 pt-4 mt-4 border-t">
                  <Button variant={"outline"} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    className="bg-red-400 hover:bg-red-500"
                    onClick={handleCreateProject}
                  >
                    Create Project
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelectionModal;
