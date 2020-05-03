import React, { ReactElement, useState } from "react";
import Layout, { AuthContext } from "../../../components/Layout";
import Head from "next/head";
import Pages from "../../../constants/pages";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Link from "next/link";
import Input from "../../../components/Inputs/Input";
import PhotoInput from "../../../components/Inputs/PhotoInput";
import { fetcher } from "../../../constants/fetcher";
import Api from "../../../constants/api";
import { useForm } from "react-hook-form";
import { EventsFormatter } from "../../../constants/formatters/eventsFormatter";
import DateInput from "../../../components/Inputs/DateInput";
import { userInterface } from "../../../constants/formatters/profileFormatter";
import { normalizeDate } from "../../../constants/formatDate";
import DraftEditor from "../../../components/Inputs/DraftEditor";

interface Props {}

interface formValues {
	title: string;
	location: string;
	dateStart: string;
	dateEnd: string;
	contacts: string;

	shortDescription: string;
}

enum steps {
	main,
	success,
}

export default function CreateEvent({}: Props): ReactElement {
	const [currentStep, currentStepSet] = useState(steps.main);

	const [userPhoto, userPhotoSet] = useState<any>();
	const [fullDescription, fullDescriptionSet] = useState<any>("");

	const { handleSubmit, register, errors, setError, clearError } = useForm({
		mode: "onBlur",
	});

	const [processing, processingSet] = useState(false);
	const onSubmit = async (values: formValues, currentUser: userInterface) => {
		clearError("formError");
		if (!currentUser.companyId) {
			return setError(
				"formError",
				"company",
				"К вам не привязана ни одна компания. Создайте компанию в личном кабинете, чтобы иметь возможность создавать мероприятия, проекты и программы."
			);
		}
		processingSet(true);

		const today = new Date();
		const payload = {
			Title: values.title,
			Announce: values.shortDescription,
			Content: fullDescription,
			Contacts: values.contacts,
			Location: values.location,
			StartEvent: normalizeDate(values.dateStart),
			EndEvent: normalizeDate(values.dateEnd),
			StartRegistration: today,
			EndRegistration: normalizeDate(values.dateStart),
			CreateByCompanyId: currentUser.companyId,
		};

		if (userPhoto) {
			payload["Photo"] = userPhoto;
		}

		const apiResponse = fetcher.fetch(Api.CreateEvent, {
			method: "POST",
			headers: { "Content-Type": "application/json-patch+json" },
			body: JSON.stringify(payload),
		});
		const formatter = new EventsFormatter();

		const response = await formatter.createEvent(apiResponse);
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
				<title>{Pages.CreateEvent.title}</title>
			</Head>

			<section>
				<div className="container">
					<Breadcrumbs
						pages={[
							{ title: Pages.Profile.header, href: Pages.Profile.route },
							{ title: Pages.CreateEvent.header },
						]}
					/>

					<h1>{Pages.CreateEvent.header}</h1>
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
													label="Название мероприятия"
													required
													error={errors.title}
													ref={register({
														required: true,
													})}
												/>
											</div>

											<div className="row">
												<div className="mb-3 col-sm-6 col-12">
													<DateInput
														name="dateStart"
														label="Дата начала"
														error={errors.dateStart}
														required
														register={register}
													/>
												</div>
												<div className="mb-3 col-sm-6 col-12">
													<DateInput
														name="dateEnd"
														label="Дата окончания"
														error={errors.dateEnd}
														required
														register={register}
													/>
												</div>
											</div>

											<div className="mb-3">
												<Input
													name="contacts"
													label="Контакты"
													error={errors.contacts}
													ref={register({})}
												/>
											</div>

											<div className="mb-3">
												<Input
													name="location"
													label="Место проведения"
													error={errors.location}
													ref={register({})}
												/>
											</div>
										</fieldset>

										<div className="mb-5">
											<PhotoInput image={userPhoto} setImage={userPhotoSet} />
										</div>

										<div className="mb-3">
											<Input
												multiline
												name="shortDescription"
												placeholder="В двух словах..."
												label="Краткое описание"
												ref={register()}
											/>
										</div>

										<div className="mb-3">
											<div className="label-text mb-2">
												Полное описание мероприятия
											</div>
											<DraftEditor setContent={fullDescriptionSet} />
										</div>

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
						<p>Мероприятие создано и будет доступно после модерации</p>
						<Link passHref href={Pages.Profile.route}>
							<a className="clear button">Вернуться в личный кабинет</a>
						</Link>
					</div>
				)}
			</section>
		</Layout>
	);
}
