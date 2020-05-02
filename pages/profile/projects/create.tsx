import React, { ReactElement, useState } from "react";
import Layout, { AuthContext } from "../../../components/Layout";
import Head from "next/head";
import Pages from "../../../constants/pages";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Link from "next/link";
import Input from "../../../components/Inputs/Input";
import { fetcher } from "../../../constants/fetcher";
import Api from "../../../constants/api";
import { useForm } from "react-hook-form";
import { userInterface } from "../../../constants/formatters/profileFormatter";
import ProjectsFormatter from "../../../constants/formatters/projectsFormatter";
import { normalizeDate } from "../../../constants/formatDate";
import PhotoInput from "../../../components/Inputs/PhotoInput";
import DateInput from "../../../components/Inputs/DateInput";

interface Props {}

interface formValues {
	title: string;

	dateStart: string;

	goal: string;
	product: string;

	description: string;
	shortDescription: string;

	advantages: string;
	actuality: string;
}

enum steps {
	main,
	success,
}

export default function CreateProject({}: Props): ReactElement {
	const [currentStep, currentStepSet] = useState(steps.main);

	const [image, imageSet] = useState();

	const { handleSubmit, register, errors, setError, clearError } = useForm({
		mode: "onBlur",
	});

	const [processing, processingSet] = useState(false);
	const onSubmit = async (values: formValues, currentUser: userInterface) => {
		clearError("formError");
		const userCompanyId = currentUser.companyId;
		if (!userCompanyId) {
			return setError(
				"formError",
				"company",
				"К вам не привязана ни одна компания. Создайте компанию в личном кабинете, чтобы иметь возможность создавать мероприятия, проекты и программы."
			);
		}
		processingSet(true);

		const payload = {
			Title: values.title,

			ProjectObjective: values.goal,
			ProjectProduct: values.product,

			Relevance: values.actuality,
			Benefits: values.advantages,

			Start: normalizeDate(values.dateStart),

			ShortDescription: values.shortDescription,
			Content: values.description,

			CreateByCompanyId: currentUser.companyId,
		};

		if (image) {
			payload["ImagePath"] = image;
		}

		const apiResponse = fetcher.fetch(Api.CreateProject, {
			method: "POST",
			headers: { "Content-Type": "application/json-patch+json" },
			body: JSON.stringify(payload),
		});
		const formatter = new ProjectsFormatter();

		const response = await formatter.createProject(apiResponse);
		if (response.status > 0) {
			setError("formError", "formError", response.body);
		} else {
			currentStepSet(steps.success);
		}

		processingSet(false);
	};
	return (
		<Layout>
			<Head>
				<title>{Pages.CreateProject.title}</title>
			</Head>

			<section>
				<div className="container">
					<Breadcrumbs
						pages={[
							{ title: Pages.Profile.header, href: Pages.Profile.route },
							{ title: Pages.CreateProject.header },
						]}
					/>

					<h1>{Pages.CreateProject.header}</h1>
				</div>

				{currentStep === steps.main && (
					<div className="container">
						<div className="col-lg-8 px-0">
							<AuthContext.Consumer>
								{({ currentUser }) => (
									<form
										onSubmit={handleSubmit((values: formValues) =>
											onSubmit(values, currentUser)
										)}
									>
										{/* Common */}
										<fieldset>
											<div className="mb-3">
												<Input
													name="title"
													label="Название"
													required
													error={errors.title}
													ref={register({
														required: true,
													})}
												/>
											</div>

											<div className="mb-3">
												<PhotoInput image={image} setImage={imageSet} />
											</div>

											<div className="mb-3">
												<Input
													name="goal"
													label="Цель проекта"
													required
													error={errors.goal}
													ref={register({
														required: true,
													})}
												/>
											</div>

											<div className="mb-3">
												<Input
													name="product"
													label="Продукт проекта"
													error={errors.product}
													ref={register({})}
												/>
											</div>

											<div className="mb-3">
												<Input
													name="actuality"
													label="Акуальность"
													error={errors.actuality}
													ref={register({})}
												/>
											</div>

											<div className="mb-3">
												<Input
													name="advantages"
													label="Преимущества"
													error={errors.advantages}
													ref={register({})}
												/>
											</div>

											<div className="mb-3">
												<DateInput
													name="dateStart"
													label="Дата старта"
													error={errors.dateStart}
													register={register}
												/>
											</div>
										</fieldset>

										<div className="mb-3">
											<Input
												multiline
												name="shortDescription"
												label="Краткое описание"
												error={errors.shortDescription}
												ref={register({})}
											/>
										</div>

										<div className="mb-3">
											<Input
												multiline
												required
												error={errors.description}
												name="description"
												label="О проекте"
												ref={register({
													required: true,
												})}
											/>
										</div>

										{/* TODO: add co-authors */}

										{errors.formError && (
											<div className="mb-2 error">
												{(errors.formError as any).message}
											</div>
										)}

										<button disabled={processing} className="primary">
											{processing ? "Создание..." : "Опубликовать"}
										</button>
									</form>
								)}
							</AuthContext.Consumer>
						</div>
					</div>
				)}

				{currentStep === steps.success && (
					<div className="container">
						<h1>Успех!</h1>
						<p>Проект создан и будет доступен после модерации</p>
						<Link passHref href={Pages.Profile.route}>
							<a className="clear button">Вернуться в личный кабинет</a>
						</Link>
					</div>
				)}
			</section>
		</Layout>
	);
}
