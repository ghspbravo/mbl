import React, { ReactElement, useState } from "react";
import Layout from "../../../components/Layout";
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

interface Props {}

interface formValues {
	title: string;
	dateStart: string;
	dateEnd: string;
	contacts: string;
	about: string;
}

enum steps {
	main,
	success,
}

export default function CreateEvent({}: Props): ReactElement {
	const [currentStep, currentStepSet] = useState(steps.main);

	const [userPhoto, userPhotoSet] = useState<any>();
	let photoFile: File;
	const onPhotoChange = e => {
		const input = e.target;

		if (input.files && input.files[0]) {
			photoFile = input.files[0];
			var reader = new FileReader();

			reader.onload = function(e) {
				const filePath = e.target.result;
				userPhotoSet(filePath);
			};

			reader.readAsDataURL(photoFile);
		}
	};
	const onPhotoRemove = () => {
		userPhotoSet(undefined);
		photoFile = null;
	};

	const { handleSubmit, register, errors, setError, clearError } = useForm({
		mode: "onBlur",
	});

  const [processing, processingSet] = useState(false);
  // TODO: add submit method
	const onSubmit = async (values: formValues) => {
    currentStepSet(steps.success);
    return;
		clearError("formError");
		processingSet(true);

		const payload = {};

		if (userPhoto) {
			payload["Photo"] = userPhoto;
		}

		const apiResponse = fetcher.fetch(Api.CreateCompany, {
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
							<form onSubmit={handleSubmit(onSubmit)}>
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
								</fieldset>

                {/* TODO: add photo
                <div className="mb-5">
									<PhotoInput
										image={userPhoto}
										onRemove={onPhotoRemove}
										onChange={onPhotoChange}
									/>
								</div> */}

								<div className="mb-3">
									<Input
										multiline
										name="announce"
										placeholder="В двух словах..."
										label="Краткое описание"
										ref={register()}
									/>
								</div>

								<div className="mb-3">
									<Input
										multiline
										name="about"
										label="Полное описание мероприятия"
										ref={register()}
									/>
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
						</div>
					</div>
				)}

				{currentStep === steps.success && (
					<div className="container">
						<h1>Успех!</h1>
						<p>Мероприятие создано.</p>
						<Link passHref href={Pages.Profile.route}>
							<a className="clear button">Вернуться в личный кабинет</a>
						</Link>
					</div>
				)}
			</section>
		</Layout>
	);
}
