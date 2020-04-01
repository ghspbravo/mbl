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

interface Props {}

interface formValues {
	title: string;
	duration: string;
	contacts: string;
  aboutCource: string;
  shortDescription: string;
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

	const [processing, processingSet] = useState(false);
	const onSubmit = async (values: formValues, currentUser: userInterface) => {
    clearError("formError");
    const userCompanyId = currentUser.companies[0]
		if (!userCompanyId) {
			return setError(
				"formError",
				"company",
				"К вам не привязана ни одна компания. Создайте компанию в личном кабинете, чтобы иметь возможность создавать мероприятия, проекты и программы."
			);
		}
		processingSet(true);

		const payload = {
      "Title": values.title,
      "Announce": values.shortDescription,
      "Content": values.aboutCource,
      "Contacts": values.contacts,
      "Duration": parseInt(values.duration),
      "DurationModifier": 0,
      "CreateByCompanyId": userCompanyId,
    };

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

											<div className="row">
												<div className="mb-3 col-sm-6 col-12">
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
											<Input
                        multiline
                        required
                        error={errors.aboutCource}
												name="aboutCource"
												label="О программе"
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
						<p>Программа создана.</p>
						<Link passHref href={Pages.Profile.route}>
							<a className="clear button">Вернуться в личный кабинет</a>
						</Link>
					</div>
				)}
			</section>
		</Layout>
	);
}
