import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "../ui/button";
import { ThemedText } from "../ThemedText";

export default function FormCard() {
  return (
    <Card className="p-2 m-2 w-full max-w-sm">
      <CardHeader>
        <CardTitle>Checkout Page</CardTitle>
        <CardDescription>Checkout Page ticket scanner</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <ThemedText>Scan</ThemedText>
        </Button>
      </CardContent>
    </Card>
  );
}
