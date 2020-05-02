import React, { ReactElement, useState, useEffect, useContext } from "react";
import Layout, { AuthContext } from "../../components/Layout";
import Head from "next/head";
import Pages from "../../constants/pages";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import Input from "../../components/Inputs/Input";
import PhotoInput from "../../components/Inputs/PhotoInput";
import { fetcher } from "../../constants/fetcher";
import Api from "../../constants/api";
import { useForm, useFieldArray } from "react-hook-form";
import DateInput from "../../components/Inputs/DateInput";
import {
	userInterface,
	ProfileFormatter,
} from "../../constants/formatters/profileFormatter";
import { nameRegexp, dateRegexp } from "../../constants/regexp";
import DynamicField from "../../components/Inputs/DynamicField";
import { CommonFormatter } from "../../constants/formatters/commonFormatter";
import Checkbox from "../../components/Inputs/Checkbox";
import Icon from "../../components/Icon";
import { formatName } from "../../constants/formatters/rootFormatter";
import { normalizeDate } from "../../constants/formatDate";

interface Props {}

interface formValues {
	name: string;
	role: boolean[];
	birthday: string;
	study: string;
	sphere: boolean[];
	link: string[];
	phone: string;
	work: { place: string; start: string; end?: string }[];
}

enum steps {
	main,
	success,
}

export default function EditProfile({}: Props): ReactElement {
	const [currentStep, currentStepSet] = useState(steps.main);

	const { getCurrentUser } = useContext(AuthContext);
	const currentUser: userInterface = getCurrentUser();
	useEffect(() => {
		if (!currentUser) return;

		setValue("birthday", currentUser.birthdayRaw);
		worksListSet(
			currentUser.workList.map((work, index) => ({
				id: index,
				place: work.name,
				start: work.startRaw,
				current: !work.endRaw,
				end: work.endRaw || "",
			}))
		);
		// resolving conflicts with worksListSet
		setTimeout(
			() =>
				currentUser.workList.forEach((work, index) =>
					setValue([
						{ [`work[${index}].start`]: work.startRaw },
						{ [`work[${index}].end`]: work.endRaw },
					])
				),
			300
		);

		linksListSet(
			currentUser.socialLinks.map((link, index) => ({
				id: index,
				value: link,
			}))
		);

		const commonFormatter = new CommonFormatter();
		commonFormatter
			.formatSkills(fetcher.fetch(Api.GetSkills))
			.then((response) => {
				if (response.status > 0) {
					setError("skills", "skillsError", response.body);
				} else {
					skillsListSet(
						response.body.map((skill) => {
							skill.checked =
								currentUser.spheresList.filter(function (item) {
									return item.id === skill.id;
								}).length > 0;
							return skill;
						})
					);
				}
			});

		userPhotoSet(currentUser.photo);
	}, [currentUser]);

	const [userPhoto, userPhotoSet] = useState<any>();

	const [skillsList, skillsListSet] = useState(null);

	const {
		handleSubmit,
		register,
		errors,
		setError,
		clearError,
		setValue,
		getValues,
	} = useForm({
		mode: "onBlur",
	});

	interface workItem {
		id?: number;
		place?: string;
		start?: string;
		end?: string;
		current?: boolean;
	}
	const [worksList, worksListSet] = useState([]);
	const appendWork = (value: workItem[]) => {
		worksListSet([...worksList, ...value]);
	};
	const removeWork = (index: number) =>
		worksListSet(() => {
			worksList.splice(index, 1);
			return [...worksList];
		});
	const editWork = (value: workItem, index) =>
		worksListSet(() => {
			worksList[index] = {
				...worksList[index],
				...value,
			};
			return [...worksList];
		});
	const onWorkAddClick = () =>
		appendWork([
			{
				id: Math.random(),
				place: "",
				start: "",
				end: "",
				current: false,
			},
		]);

	interface linkItem {
		id: number;
		value: string;
	}
	const [linksList, linksListSet] = useState([]);
	const appendLink = (value: linkItem[]) =>
		linksListSet([...linksList, ...value]);
	const removeLink = (index: number) =>
		linksListSet(() => {
			linksList.splice(index, 1);
			return [...linksList];
		});
	const editLink = (value, index) =>
		linksListSet(() => {
			linksList[index] = { ...linksList[index], value };
			return [...linksList];
		});
	const onLinkAddClick = () =>
		appendLink([
			{
				id: Math.random(),
				value: "",
			},
		]);

	const [processing, processingSet] = useState(false);
	const onSubmit = async (values: formValues) => {
		clearError("formError");
		processingSet(true);

		const formData = new FormData();
		formData.append("id", currentUser.id);

		const nameObj = formatName(values.name);
		formData.append("FirstName", nameObj.name);
		formData.append("SurName", nameObj.surname);
		if (nameObj.middlename) {
			formData.append("MiddleName", nameObj.middlename);
		}
		formData.append("BirthDate", normalizeDate(values.birthday));

		if (values.study) {
			formData.append("Education", values.study);
		}
		if (values.phone) {
			formData.append("Phone", values.phone);
		}
		if (values.role?.length) {
			let idx = 0;
			values.role.forEach((selected, index) => {
				if (selected) {
					formData.append(`ProfileTypeIds[${idx}]`, index.toString());
					idx += 1;
				}
			});
		}

		if (values.sphere?.length) {
			let idx = 0;
			values.sphere.forEach((selected, index) => {
				if (selected) {
					formData.append(`SkillIds[${idx}]`, index.toString());
					idx += 1;
				}
			});
		}
		if (values.link?.length) {
			values.link.forEach((link, index) => {
				if (link) {
					formData.append(`SocialNetWorkUrls[${index}]`, link);
				}
			});
		}
		if (values.work?.length) {
			values.work.forEach((work, index) => {
				if (work) {
					formData.append(`WorkExperiences[${index}].Name`, work.place);
					formData.append(
						`WorkExperiences[${index}].Start`,
						normalizeDate(work.start)
					);
					if (work.end) {
						formData.append(
							`WorkExperiences[${index}].End`,
							normalizeDate(work.end)
						);
					}
				}
			});
		}

		if (userPhoto) {
			formData.append("Photo", userPhoto);
		}

		const apiResponse = fetcher.fetch(Api.EditProfile, {
			method: "POST",
			body: formData,
		});

		const formatter = new ProfileFormatter();

		const response = await formatter.editUser(apiResponse);
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
				<title>{Pages.ProfileEdit.title}</title>
			</Head>

			<section>
				<div className="container">
					<Breadcrumbs
						pages={[
							{ title: Pages.Profile.header, href: Pages.Profile.route },
							{ title: Pages.ProfileEdit.header },
						]}
					/>

					<h1>{Pages.ProfileEdit.header}</h1>
				</div>

				{currentStep === steps.main && (
					<div className="container">
						<form
							onSubmit={handleSubmit((values: formValues) => onSubmit(values))}
						>
							<div className="row">
								<div className="col-12 col-md-5 col-lg-4 col-xl-3">
									<PhotoInput image={userPhoto} setImage={userPhotoSet} />
								</div>
								<div className="col-12 col-md-7 col-lg-8 col-xl-9">
									<h2>Информация о себе</h2>

									<div className="mt-3">
										<Input
											name="name"
											label="ФИО"
											required
											defaultValue={currentUser?.name}
											error={errors.name}
											ref={register({
												required: true,
												pattern: {
													value: nameRegexp,
													message:
														"Проверьте правильность введенной информации",
												},
											})}
										/>
									</div>

									<div className="mt-3">
										<DateInput
											name="birthday"
											label="Дата рождения"
											required
											error={errors.birthday}
											register={register}
										/>
									</div>

									<div className="mt-3">
										<Input
											name="study"
											label="Место учебы"
											defaultValue={currentUser?.education}
											error={errors.study}
											ref={register({})}
										/>
									</div>

									<div className="mt-3">
										<div className="label-text mb-3">Место работы</div>
										{worksList.map((workPlace: workItem, index) => (
											<div key={workPlace.id} className="mt-2">
												<DynamicField removeHandler={() => removeWork(index)}>
													<fieldset>
														<div>
															<Input
																name={`work[${index}].place`}
																label="Организация, должность"
																required
																onChange={(e) =>
																	editWork(
																		{
																			place: (e.target as any).value,
																		},
																		index
																	)
																}
																defaultValue={workPlace.place}
																error={errors.work && errors.work[index]?.place}
																ref={register({
																	required: true,
																})}
															/>
														</div>

														<div className="my-2">
															<input
																className="d-inline"
																type="checkbox"
																defaultChecked={workPlace.current}
																name={`work[${index}].current`}
																id={`work[${index}].current`}
															/>
															<label
																className="ml-2"
																htmlFor={`work[${index}].current`}
															>
																Текущее место работы
															</label>
														</div>

														<div className="row">
															<div className="col-md-6">
																<DateInput
																	name={`work[${index}].start`}
																	label="Начало работы"
																	required
																	onChange={(e) =>
																		editWork(
																			{
																				start: (e.target as any).value,
																			},
																			index
																		)
																	}
																	error={
																		errors.work && errors.work[index]?.start
																	}
																	register={register}
																/>
															</div>
															<div className="col-md-6">
																<DateInput
																	name={`work[${index}].end`}
																	label="Окончание работы"
																	onChange={(e) =>
																		editWork(
																			{
																				end: (e.target as any).value,
																			},
																			index
																		)
																	}
																	error={errors.work && errors.work[index]?.end}
																	register={register}
																/>
															</div>
														</div>
													</fieldset>
												</DynamicField>
											</div>
										))}
										<button
											className="link primary clear"
											type="button"
											onClick={onWorkAddClick}
										>
											+ добавить место работы
										</button>
									</div>

									<div className="mt-3">
										<div className="label-text mb-3">
											Интересы, профессиональные области
										</div>

										{skillsList?.length > 0 && (
											<div className="row no-gutters">
												{skillsList.map((sphere) => (
													<div key={sphere.id} className="mr-3 mb-2">
														<Checkbox
															ref={register({})}
															checked={sphere.checked}
															name={`sphere[${sphere.id}]`}
														>
															{sphere.name}
														</Checkbox>
													</div>
												))}
											</div>
										)}
										{skillsList === null && (
											<Icon name="ei-spinner-2" size={24} />
										)}
										{errors.skills && (
											<div className="error">
												{(errors.skills as any).message}
											</div>
										)}
									</div>

									<div className="mt-3">
										<fieldset>
											<Input
												name="phone"
												label="Телефон"
												error={errors.phone}
												defaultValue={currentUser?.phone}
												ref={register({})}
											/>
										</fieldset>
									</div>

									<div className="mt-3">
										<div className="label-text mb-3">Ссылки на соцсети</div>
										{linksList.map((linkItem, index) => (
											<div key={linkItem.id} className="mt-1">
												<DynamicField removeHandler={() => removeLink(index)}>
													<fieldset>
														<div>
															<Input
																name={`link[${index}]`}
																onChange={(e) =>
																	editLink((e.target as any).value, index)
																}
																defaultValue={linkItem.value}
																placeholder="URL"
																required
																error={errors.link && errors.link[index]}
																ref={register({
																	required: true,
																})}
															/>
														</div>
													</fieldset>
												</DynamicField>
											</div>
										))}
										<button
											className="link primary clear"
											type="button"
											onClick={onLinkAddClick}
										>
											+ добавить соцсеть
										</button>
									</div>
								</div>
							</div>

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
				)}

				{currentStep === steps.success && (
					<div className="container">
						<h1>Успех!</h1>
						<p>Информация изменена</p>
						<Link passHref href={Pages.Profile.route}>
							<a className="clear button">Вернуться в личный кабинет</a>
						</Link>
					</div>
				)}
			</section>
		</Layout>
	);
}
