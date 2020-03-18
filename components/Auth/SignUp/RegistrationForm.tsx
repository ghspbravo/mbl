import React, { ReactElement, useState, useEffect, useContext } from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import Input from '../../Inputs/Input';
import { nameRegexp, dateRegexp, emailRegexp } from '../../../constants/regexp';
import Checkbox from '../../Inputs/Checkbox';
import MaskedInput from 'react-text-mask'
import composeRefs from '@seznam/compose-react-refs'
import DynamicField from '../../Inputs/DynamicField';
import PhotoInput from '../../Inputs/PhotoInput';
import { fetcher } from '../../../constants/fetcher';
import Api from '../../../constants/api';
import { RegistrationFormatter } from '../../../constants/formatters/registrationFormatter';
import { formatName } from '../../../constants/formatters/rootFormatter';
import { setToken } from '../../../constants/auth';
import { CommonFormatter } from '../../../constants/formatters/commonFormatter';
import Icon from '../../Icon';
import { AuthContext } from '../../Layout';


interface Props {
  nextStepHandler: Function
}

// "http://dev.mbl.mba/api/v1/Account/Register?Email=test%40mail.ru&Password=12345678&WorkExperiences=%7BName%3A%20%22work1%22%2C%20Start%3A%20%2201-01-2010%22%2C%20End%3A%20%2211-02-2018%22%7D&WorkExperiences=%7BName%3A%20%22work2%22%2C%20Start%3A%20%2212-02-2018%22%7D&ProfileTypeIds=1&ProfileTypeIds=2&FirstName=%D0%98%D0%B2%D0%B0%D0%BD&SurName=%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2&MiddleName=%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%D0%B8%D1%87&BirthDate=01-10-1999"
export default function RegistrationForm({ nextStepHandler }: Props): ReactElement {
  const { handleSubmit, register, errors, setError, clearError, watch, control } = useForm({
    mode: "onBlur"
  });
  const userPassword = watch('password')

  const [userPhoto, userPhotoSet] = useState<any>();
  let photoFile: File;
  const onPhotoChange = (e) => {
    const input = e.target;

    if (input.files && input.files[0]) {
      photoFile = input.files[0]
      var reader = new FileReader();

      reader.onload = function (e) {
        const filePath = e.target.result
        userPhotoSet(filePath);
      }

      reader.readAsDataURL(photoFile);
    }
  }
  const onPhotoRemove = () => {
    userPhotoSet(undefined);
    photoFile = null;
  }

  interface formValues {
    username: string,
    password: string,
    repeatPassword: string,
    name: string,
    role?: boolean[],
    birthday: string,
    study?: string,
    sphere?: boolean[],
    link?: string[],
    work?: { place: string, start: string, end?: string }[],
  }

  const { setAuthState } = useContext(AuthContext)

  const [submitting, submittingSet] = useState(false);
  const onSubmit = async (values: formValues) => {
    clearError("signUp");
    submittingSet(true);
    const formData = new FormData();

    const nameObj = formatName(values.name)
    formData.append("FirstName", nameObj.name)
    formData.append("SurName", nameObj.surname)
    if (nameObj.middlename) { formData.append("MiddleName", nameObj.middlename) }
    formData.append("BirthDate", values.birthday.replace(/\./g, "-"))

    formData.append("Email", values.username)
    formData.append("Password", values.password)

    if (values.study) { formData.append("Education", values.study) }
    if (values.role?.length) {
      let idx = 0;
      values.role.forEach((selected, index) => {
        if (selected) {
          formData.append(`ProfileTypeIds[${idx}]`, index.toString());
          idx += 1;
        }
      })
    }

    if (values.sphere?.length) {
      let idx = 0;
      values.sphere.forEach((selected, index) => {
        if (selected) {
          formData.append(`SkillIds[${idx}]`, index.toString());
          idx += 1;
        }
      })
    }
    if (values.link?.length) {
      values.link.forEach((link, index) => {
        if (link) {
          formData.append(`SocialNetWorkUrls[${index}]`, link);
        }
      })
    }
    if (values.work?.length) {
      values.work.forEach((work, index) => {
        if (work) {
          formData.append(`WorkExperiences[${index}].Name`, work.place)
          formData.append(`WorkExperiences[${index}].Start`, work.start.replace(/\./g, "-"))
          if (work.end) { formData.append(`WorkExperiences[${index}].End`, work.end.replace(/\./g, "-") || "") }
        }
      })
    }

    if (photoFile) { formData.append("Photo", photoFile); }

    const apiResponse = fetcher.fetch(Api.Register, {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      body: formData
    })

    const registrationFormatter = new RegistrationFormatter();

    const response = await registrationFormatter.format(apiResponse)
    if (response.status > 0) {
      setError("signUp", "signUpError", response.body)
    } else {
      setToken(response.body, setAuthState);

      nextStepHandler();
    }
    submittingSet(false);
  };

  const [rolesList, rolesListSet] = useState(null)
  const [skillsList, skillsListSet] = useState(null)
  useEffect(() => {
    const commonFormatter = new CommonFormatter();
    commonFormatter.formatRoles(fetcher.fetch(Api.GetRoles))
      .then(response => {
        if (response.status > 0) { setError("roles", "rolesError", response.body) }
        else { rolesListSet(response.body) }
      })
    commonFormatter.formatSkills(fetcher.fetch(Api.GetSkills))
      .then(response => {
        if (response.status > 0) { setError("skills", "skillsError", response.body) }
        else { skillsListSet(response.body) }
      })

  }, [])


  const { fields: worksList, append: appendWork, remove: removeWork } = useFieldArray({
    control,
    name: "work"
  });
  const onWorkAddClick = () => appendWork({});

  const { fields: linksList, append: appendLink, remove: removeLink } = useFieldArray({
    control,
    name: "link"
  });
  const onLinkAddClick = () => appendLink({});

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* credentials */}
      <div className="px-0 col-sm-10 col-xl-6 col-lg-8">
        <fieldset>
          <Input name="username" label="Почта" type="email" required
            error={errors.username}
            ref={register({
              required: true,
              pattern: {
                value: emailRegexp,
                message: "Неверный формат почты"
              }
            })}
          />

          <div className="row mt-3">
            <div className="col-12 col-sm">
              <Input name="password" label="Пароль" type="password" required
                error={errors.password}
                ref={register({
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Пароль должен содержать хотя бы 8 символов"
                  }
                })}
              />
            </div>

            <div className="col-12 col-sm">
              <Input name="repeatPassword" label="Повторите пароль" type="password" required
                error={errors.repeatPassword ? { message: "Пароли не совпадают" } : false}
                ref={register({
                  required: true,
                  validate: value => value === userPassword,
                })}
              />
            </div>
          </div>
        </fieldset>
      </div>

      {/* role */}
      <div className="mt-4">
        <h2>Роль</h2>

        {rolesList?.length > 0 && <fieldset>
          <div className="row no-gutters">
            {rolesList.map(role => <div key={role.id} className="mr-3 mb-2">
              <Checkbox ref={register({})} name={`role[${role.id}]`}>{role.name}</Checkbox>
            </div>)}
          </div>

        </fieldset>}
        {rolesList === null && <Icon name="ei-spinner-2" size={24} />}
        {errors.roles && <div className="error">
          {(errors.roles as any).message}
        </div>}
      </div>

      {/* about */}
      <div className="mt-4">
        <h2>Информация о себе</h2>

        <div className="px-0 col-sm-10 col-xl-6 col-lg-8">
          <fieldset>

            <Input name="name" label="ФИО" required
              error={errors.name}
              ref={register({
                required: true,
                pattern: {
                  value: nameRegexp,
                  message: "Проверьте правильность введенной информации"
                }
              })}
            />

            <div className="my-5">
              <PhotoInput image={userPhoto} onRemove={onPhotoRemove} onChange={onPhotoChange} />
            </div>

            <div className="mt-3">
              <MaskedInput
                mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
                guide={true}
                render={(ref, props) => <Input name="birthday" label="Дата рождения" required {...props}
                  error={errors.birthday}
                  ref={composeRefs(
                    register({
                      required: true,
                      pattern: {
                        value: dateRegexp,
                        message: "Введите корректную дату"
                      }
                    }), ref
                  )}
                />}
              />
            </div>


          </fieldset>

          <div className="mt-3">
            <fieldset>
              <Input name="study" label="Место учебы"
                error={errors.study}
                ref={register({})}
              />
            </fieldset>
          </div>

          <div className="mt-3">
            <div className="label-text mb-3">Место работы</div>

            {worksList.map((workPlace, index) => <div key={workPlace.id} className="mt-2">
              <DynamicField removeHandler={() => removeWork(index)}>
                <fieldset>
                  <div>
                    <Input name={`work[${index}].place`} label="Организация, должность" required
                      error={errors.work && errors.work[index]?.place}
                      ref={register({
                        required: true,
                      })}
                    />
                  </div>

                  <div className="my-2">
                    <input className="d-inline" type="checkbox" name="current" id={`work[${index}].current`} />
                    <label className="ml-2" htmlFor={`work[${index}].current`}>Текущее место работы</label>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <MaskedInput
                        mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
                        guide={true}
                        render={(ref, props) => <Input name={`work[${index}].start`} label="Начало работы" required {...props}
                          error={errors.work && errors.work[index]?.start}
                          ref={composeRefs(
                            register({
                              required: true,
                              pattern: {
                                value: dateRegexp,
                                message: "Введите корректную дату"
                              }
                            }), ref
                          )}
                        />}
                      />
                    </div>
                    <div className="col-md-6">
                      <MaskedInput
                        mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
                        guide={true}
                        render={(ref, props) => <Input name={`work[${index}].end`} label="Окончание работы" {...props}
                          error={errors.work && errors.work[index]?.end}
                          ref={composeRefs(
                            register({
                              pattern: {
                                value: dateRegexp,
                                message: "Введите корректную дату"
                              }
                            }), ref
                          )}
                        />}
                      />
                    </div>
                  </div>

                </fieldset>
              </DynamicField>
            </div>)}
            <button className="link primary clear" type="button" onClick={onWorkAddClick}>+ добавить место работы</button>
          </div>


          <div className="mt-4">
            <div className="label-text mb-3">Интересы, профессиональные области</div>

            {skillsList?.length > 0 && <fieldset>
              <div className="row no-gutters">
                {skillsList.map(sphere => <div key={sphere.id} className="mr-3 mb-2">
                  <Checkbox ref={register({})} name={`sphere[${sphere.id}]`}>{sphere.name}</Checkbox>
                </div>)}
              </div>
            </fieldset>}
            {skillsList === null && <Icon name="ei-spinner-2" size={24} />}
            {errors.skills && <div className="error">
              {(errors.skills as any).message}
            </div>}
          </div>

          <div className="mt-3">
            <div className="label-text mb-3">Ссылки на соцсети</div>
            {linksList.map((linkItem, index) => <div key={linkItem.id} className="mt-1">
              <DynamicField removeHandler={() => removeLink(index)}>
                <fieldset>
                  <div>
                    <Input name={`link[${index}]`} placeholder="URL" required
                      error={errors.link && errors.link[index]}
                      ref={register({
                        required: true,
                      })}
                    />
                  </div>
                </fieldset>
              </DynamicField>
            </div>)}
            <button className="link primary clear" type="button" onClick={onLinkAddClick}>+ добавить соцсеть</button>
          </div>

        </div>
      </div>


      {errors.signUp && <div className="error">
        {(errors.signUp as any).message}
      </div>}

      <div className="mt-5">
        <button disabled={submitting} className="primary mx-auto">{submitting ? "Регистрация..." : "Зарегистрироваться"}</button>
      </div>
    </form>
  )
}
