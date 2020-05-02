import React, { ReactElement, useState, useContext, useEffect } from "react";
import Layout, { AuthContext } from "../../../components/Layout";
import Head from "next/head";
import Pages from "../../../constants/pages";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useForm } from "react-hook-form";
import Input from "../../../components/Inputs/Input";
import DynamicField from "../../../components/Inputs/DynamicField";
import PhotoInput from "../../../components/Inputs/PhotoInput";
import Select from "../../../components/Inputs/Select";
import { emailRegexp } from "../../../constants/regexp";
import Link from "next/link";
import { businessSizesList } from "../../../constants/businessSize";
import { fetcher } from "../../../constants/fetcher";
import Api from "../../../constants/api";
import CompanyFormatter, {
	Company,
} from "../../../constants/formatters/companyFormatter";
import { userInterface } from "../../../constants/formatters/profileFormatter";
import DateInput from "../../../components/Inputs/DateInput";

interface Props {}

interface formValues {
	title: string;
	shortTitle: string;
	foundationDate: string;
	inn: string;
	sphere: number[];
	membersCount: string;
	costValue: string;
	email: string;
	phone: string;
	site: string;
}

enum steps {
	main,
	success,
}

export default function EditCompany({}: Props): ReactElement {
	const [step, stepSet] = useState(steps.main);

	const { getCurrentUser } = useContext(AuthContext);
	const {
		company: currentCompany = {} as Company,
	}: userInterface = getCurrentUser();

	const [logo, logoSet] = useState<any>(currentCompany.logo);
	const [image, imageSet] = useState<any>(currentCompany.image);

	useEffect(() => {
		if (!currentCompany) {
			return;
		}
		setValue("foundationDate", currentCompany.foundationDate);

		sphereListSet(
			currentCompany.spheresRaw.map((item, index) => ({
				id: index,
				value: item,
			}))
		);
	}, [currentCompany]);

	const {
		handleSubmit,
		register,
		errors,
		setError,
		clearError,
		setValue,
	} = useForm({
		mode: "onBlur",
	});

	interface sphereItem {
		id: number;
		value: string;
	}
	const [sphereList, sphereListSet] = useState([]);
	const appendSphere = (value: sphereItem[]) =>
		sphereListSet([...sphereList, ...value]);
	const removeSphere = (index: number) =>
		sphereListSet(() => {
			sphereList.splice(index, 1);
			return [...sphereList];
		});
	const editSphere = (value, index) =>
		sphereListSet(() => {
			sphereList[index] = { ...sphereList[index], value };
			return [...sphereList];
		});
	const onSphereAddClick = () =>
		appendSphere([
			{
				id: Math.random(),
				value: "",
			},
		]);

	const [businessSizeValue, businessSizeValueSet] = useState(
		currentCompany.sizeRaw
	);
	const [businessSize, businessSizeSet] = useState(
		businessSizesList[businessSizeValue].name
	);
	const onBusinessSizeChange = (value: string) => {
		businessSizeSet(businessSizesList[value].name);
		businessSizeValueSet(parseInt(value));
	};

	const [processing, processingSet] = useState(false);
	const onSubmit = async (values: formValues) => {
		clearError("formError");
		processingSet(true);

		const payload = {
			Id: currentCompany.id,
			FullName: values.title,
			ShortName: values.shortTitle,
			INN: values.inn,
			Size: businessSizeValue,
			EmployeeCount: parseInt(values.membersCount),
			AnnualRevenue: parseInt(values.costValue),
			Email: values.email,
			Phone: values.phone,
			Site: values.site,
			Occupations: values.sphere,
			YearOfFoundation: values.foundationDate,
		};

		if (logo) {
			payload["Photo"] = logo;
		}

		if (image) {
			payload["Image"] = image;
		}

		const apiResponse = fetcher.fetch(Api.EditCompany, {
			method: "POST",
			headers: { "Content-Type": "application/json-patch+json" },
			body: JSON.stringify(payload),
		});
		const formatter = new CompanyFormatter();

		const response = await formatter.createCompany(apiResponse);
		if (response.status > 0) {
			setError("formError", "formError", response.body);
		} else {
			stepSet(steps.success);
		}

		processingSet(false);
	};
	return (
		<Layout>
			<Head>
				<title>{Pages.CompanyEdit.title}</title>
			</Head>

			<section>
				<div className="container">
					<Breadcrumbs
						pages={[
							{ title: Pages.Profile.header, href: Pages.Profile.route },
							{ title: Pages.CompanyEdit.header },
						]}
					/>

					<h1>{Pages.CompanyEdit.header}</h1>
				</div>

				{step === steps.main && (
					<div>
						<div className="container">
							<div className="col-lg-8 px-0">
								<form onSubmit={handleSubmit(onSubmit)}>
									{/* Common */}
									<fieldset>
										<div className="mb-3">
											<Input
												name="title"
												label="Полное наименование компании"
												required
												error={errors.title}
												defaultValue={currentCompany.title}
												ref={register({
													required: true,
													minLength: {
														value: 6,
														message: "Введите полное наименование компании",
													},
												})}
											/>
										</div>

										<div className="mb-3">
											<Input
												name="shortTitle"
												label="Сокращенное название компании"
												error={errors.shortTitle}
												defaultValue={currentCompany.shortTitle}
												ref={register({})}
											/>
										</div>

										<div className="mb-3">
											<DateInput
												name="foundationDate"
												label="Дата основания"
												error={errors.foundationDate}
												register={register}
											/>
										</div>

										<div className="mb-3">
											{/* TODO: add input mask */}
											<Input
												name="inn"
												label="ИНН"
												error={errors.inn}
												defaultValue={currentCompany.inn}
												ref={register({
													minLength: {
														value: 10,
														message: "ИНН должен состоять из 10 чисел",
													},
													maxLength: {
														value: 10,
														message: "ИНН должен состоять из 10 чисел",
													},
												})}
											/>
										</div>

										<div className="mb-3">
											<div className="label-text mb-2">Виды деятельности</div>
											{sphereList.map((sphere, index) => (
												<div key={sphere.id} className="mb-2">
													<DynamicField
														removeHandler={() => removeSphere(index)}
													>
														<div>
															<Input
																defaultValue={sphere.value}
																onChange={(e) =>
																	editSphere((e.target as any).value, index)
																}
																name={`sphere[${index}]`}
																ref={register({})}
															/>
														</div>
													</DynamicField>
												</div>
											))}
											<button
												className="link primary clear"
												type="button"
												onClick={onSphereAddClick}
											>
												+ добавить
											</button>
										</div>
									</fieldset>

									<div className="mb-5">
										<div className="label-text mb-2">Логотип компании</div>
										<PhotoInput image={logo} setImage={logoSet} />

										<div className="label-text my-2">Изображение компании</div>
										<PhotoInput image={image} setImage={imageSet} />
									</div>
									<fieldset>
										<div className="mb-3">
											<div className="row">
												<div className="mb-2 col-lg-4 col-6">
													<div className="label-text mb-2">Размер бизнеса</div>
													<Select
														items={businessSizesList}
														changeHandler={onBusinessSizeChange}
													>
														{businessSize}
													</Select>
												</div>
												<div className="mb-2 col-lg-4 col-6">
													<Input
														label="Кол.-во сотрудников"
														defaultValue={currentCompany.membersCount}
														name="membersCount"
														ref={register({})}
														type="number"
														min="1"
													/>
												</div>
												<div className="mb-2 col-lg-4 col-12">
													<Input
														label="Объем годовой выручки"
														name="costValue"
														defaultValue={currentCompany.costValue}
														ref={register({})}
														type="number"
														min="1"
													/>
												</div>
											</div>
										</div>
									</fieldset>

									<fieldset>
										<div className="mb-2">
											<Input
												name="email"
												type="email"
												label="E-mail"
												defaultValue={currentCompany.email}
												error={errors.email}
												ref={register({
													pattern: {
														value: emailRegexp,
														message: "Неверный формат почты",
													},
												})}
											/>
										</div>

										<div className="mb-2">
											<Input
												name="phone"
												type="phone"
												label="Телефон"
												defaultValue={currentCompany.phone}
												// error={errors.phone}
												// TODO: add phone regexp
												ref={register({})}
											/>
										</div>

										<div className="mb-2">
											<Input
												name="site"
												type="site"
												label="Сайт"
												defaultValue={currentCompany.site}
												ref={register({})}
											/>
										</div>
									</fieldset>

									{errors.formError && (
										<div className="mb-2 error">
											{(errors.formError as any).message}
										</div>
									)}

									<button disabled={processing} className="primary">
										{processing ? "Сохранение..." : "Сохранить"}
									</button>
								</form>
							</div>
						</div>
					</div>
				)}

				{step === steps.success && (
					<div className="container">
						<h1>Успех!</h1>
						<p>Информация о компании изменена.</p>
						<Link passHref href={Pages.Profile.route}>
							<a className="clear button">Вернуться в личный кабинет</a>
						</Link>
					</div>
				)}
			</section>
		</Layout>
	);
}
