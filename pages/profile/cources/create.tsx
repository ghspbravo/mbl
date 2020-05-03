import React, { ReactElement, useState, useContext } from "react";
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
import Select from "../../../components/Inputs/Select";
import PhotoInput from "../../../components/Inputs/PhotoInput";
import { normalizeDate } from "../../../constants/formatDate";
import DateInput from "../../../components/Inputs/DateInput";
import DraftEditor from "../../../components/Inputs/DraftEditor";

interface Props {}

interface formValues {
	title: string;

	photo: string;

	shortDescription: string;

	duration: string;
	dateStart: string;
	dateEnd: string;

	contacts: string;
}

enum steps {
	main,
	success,
}

export default function CreateCource({}: Props): ReactElement {
	const [currentStep, currentStepSet] = useState(steps.main);

	const { handleSubmit, register, errors, setError, clearError } = useForm({
		mode: "onBlur",
	});

	const [aboutCource, aboutCourceSet] = useState("");

	const { getCurrentUser } = useContext(AuthContext);
	const currentUser: userInterface = getCurrentUser();
	const projectsList = currentUser.myProjects
		.filter((item) => item.isCreator)
		.map((item) => ({
			value: item.id,
			name: item.title,
		}));

	const [project, projectSet] = useState("Выберите проект");
	const [projectId, projectIdSet] = useState();
	const onProjectSelect = (value, index) => {
		projectSet(projectsList[index].name);
		projectIdSet(value);
	};

	const [photo, photoSet] = useState();

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
		if (!projectId) {
			return setError(
				"formError",
				"projectId",
				"Выберите целевой проект для данной программы."
			);
		}
		processingSet(true);

		const payload = {
			Title: values.title,

			Announce: values.shortDescription,
			Content: aboutCource,

			Duration: parseInt(values.duration),
			DurationModifier: 0,
			StartEvent: normalizeDate(values.dateStart),
			EndEvent: normalizeDate(values.dateEnd),

			Contacts: values.contacts,

			CreateByCompanyId: userCompanyId,
			CreateForProjectId: projectId,
		};

		if (photo) {
			payload["ImagePath"] = photo;
			payload["ImagePreviewPath"] = photo;
		}

		const apiResponse = fetcher.fetch(Api.CreateCource, {
			method: "POST",
			headers: { "Content-Type": "application/json-patch+json" },
			body: JSON.stringify(payload),
		});
		const formatter = new CourcesFormatter();

		const response = await formatter.createCource(apiResponse);
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
				<title>{Pages.CreateCource.title}</title>
			</Head>

			<section>
				<div className="container">
					<Breadcrumbs
						pages={[
							{ title: Pages.Profile.header, href: Pages.Profile.route },
							{ title: Pages.CreateCource.header },
						]}
					/>

					<h1>{Pages.CreateCource.header}</h1>
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

											<div className="px-0 mb-3 col-sm-6 col-12">
												<div className="mb-2">
													<Input
														name="duration"
														label="Длительность (в днях)"
														error={errors.duration}
														min="1"
														required
														type="number"
														ref={register({
															required: true,
															min: {
																value: 1,
																message:
																	"Введите длительность программы в днях",
															},
														})}
													/>
												</div>

												<div className="mb-2">
													<DateInput
														name="dateStart"
														label="Дата начала"
														error={errors.dateStart}
														register={register}
													/>
												</div>

												<div className="mb-2">
													<DateInput
														name="dateEnd"
														label="Дата конца"
														error={errors.dateEnd}
														register={register}
													/>
												</div>
											</div>
											<div className="px-0 mb-3 col-sm-6 col-12">
												<Select
													changeHandler={onProjectSelect}
													items={projectsList}
												>
													{project}
												</Select>
											</div>

											<div className="mb-3">
												<PhotoInput image={photo} setImage={photoSet} />
											</div>

											<div className="mb-3">
												<Input
													name="contacts"
													label="Контакты"
													required
													error={errors.contacts}
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
												placeholder="В двух словах..."
												name="shortDescription"
												error={errors.shortDescription}
												label="Краткое описание программы"
												ref={register({
													required: true,
												})}
											/>
										</div>

										<div className="mb-3">
											<div className="label-text mb-2">О программе</div>
											<DraftEditor setContent={aboutCourceSet} />
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
						<p>Программа создана и будет доступна после модерации</p>
						<Link passHref href={Pages.Profile.route}>
							<a className="clear button">Вернуться в личный кабинет</a>
						</Link>
					</div>
				)}
			</section>
		</Layout>
	);
}
