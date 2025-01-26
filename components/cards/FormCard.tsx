import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export type CardProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function FormCard({ children, title, description }: CardProps) {
  return (
    <Card className="p-2 m-2 w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
