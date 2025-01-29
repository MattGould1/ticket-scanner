import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export type CardProps = {
  title: string;
  description?: string;
  content: React.ReactNode;
  action: React.ReactNode;
};

export default function ActionCard({
  content,
  title,
  description,
  action,
}: CardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter>{action}</CardFooter>
    </Card>
  );
}
