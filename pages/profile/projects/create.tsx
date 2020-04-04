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
import { CourcesFormatter } from "../../../constants/formatters/courcesFormatter";
import ProjectsFormatter from "../../../constants/formatters/projectsFormatter";

interface Props {}

interface formValues {
	title: string;
	goal: string;
	description: string;
}

enum steps {
	main,
	success,
}

export default function CreateProject({}: Props): ReactElement {
	const [currentStep, currentStepSet] = useState(steps.main);

	const { handleSubmit, register, errors, setError, clearError } = useForm({
		mode: "onBlur",
	});

	const [processing, processingSet] = useState(false);
	const onSubmit = async (values: formValues, currentUser: userInterface) => {
		clearError("formError");
		const userCompanyId = currentUser.companies[0];
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
			Content: values.description,
			CreateByCompanyId: currentUser.companies[0],
		};

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
										</fieldset>

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
						<p>Проект создан.</p>
						<Link passHref href={Pages.Profile.route}>
							<a className="clear button">Вернуться в личный кабинет</a>
						</Link>
					</div>
				)}
			</section>
		</Layout>
	);
}
