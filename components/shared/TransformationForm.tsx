"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

export const formSchema = z.object({
    title: z.string().optional(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
});

import React, { useState } from "react";
import { aspectRatioOptions, defaultValues, transformationTypes } from "@/constants";
import { CustomField } from "./CustomField";
import { AspectRatioKey } from "@/lib/utils";

interface TransformationFormProps {
    action: string;
    data?: any;
    userId: string;
    type: string;
    creditBalance: number;
    config: any;
}

const TransformationForm: React.FC<TransformationFormProps> = ({
    action,
    data = null,
    userId,
    type,
    creditBalance,
    config = null,
}) => {
    const transformationType = transformationTypes[type];

    const [image, setImage] = useState(data);
    const [newTransformations, setnewTransformation] = useState(null);
    const [isSubmitting, setisSubmitting] = useState(false);

    const [isTransforming, setisTransforming] = useState(false);

    const [transformationConfig, settransformationConfig] = useState(config);


    const initialValues = data && action === "Update"
        ? {
            title: data?.title,
            aspectRatio: data?.aspectRatio,
            color: data?.color,
            prompt: data?.prompt,
            publicId: data?.publicId,
        }
        : defaultValues;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
    };

    const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
        onChangeField(value);
    };

    const onInputChangeHandler = (fieldName: string,value: string,
        type: string, onChangeField: (value: string) => void
    ) => {
    };

    const onTransformHandler = () => {
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomField
                    control={form.control}
                    name="title"
                    formLabel="Image title"
                    className="w-full"
                    render={({ field }) => <Input {...field} className="input-field" />}
                />

                {type === "fill" && (
                    <CustomField
                        control={form.control}
                        name="aspectRatio"
                        formLabel="Aspect ratio"
                        className="w-full"
                        render={({ field }) => (
                            <Select onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}>
                                <SelectTrigger className="select-field">
                                    <SelectValue placeholder="Select Size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(aspectRatioOptions).map((key) => (
                                        <SelectItem key={key} value={key} className="select-item">
                                            {aspectRatioOptions[key as AspectRatioKey].label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                )}

                {(type === "remove" || type === "recolor") && (
                    <div className="prompt-field">
                        <CustomField
                            control={form.control}
                            name="prompt"
                            formLabel={type === "remove" ? "Object to remove" : "Object to recolor"}
                            className="w-full"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className="input-field"
                                    onChange={(e) =>
                                        onInputChangeHandler("prompt", e.target.value, type, field.onChange)
                                    }
                                />
                            )}
                        />

                        {type === "recolor" && (
                            <CustomField
                                control={form.control}
                                name="color"
                                formLabel="Replacement Color"
                                className="w-full"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        className="input-field"
                                        onChange={(e) =>
                                            onInputChangeHandler("color", e.target.value, 'recolor', field.onChange)
                                        }
                                    />
                                )}
                            />
                        )}
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    <Button
                        className="submit-button capitalize"
                        disabled={isTransforming || newTransformations === null}
                        type="button"
                        onClick={onTransformHandler}>
                        {isTransforming ? 'Applying.....' : 'Apply Transformaion'}
                    </Button>

                    <Button
                        className="submit-button capitalize"
                        disabled={isSubmitting}
                        type="submit">
                        {isSubmitting ? 'Submit' : 'Save Image'}
                    </Button>

                </div>


            </form>
        </Form>
    );
};

export default TransformationForm;
