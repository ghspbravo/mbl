import React, { ReactElement, useState } from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import Input from '../../Inputs/Input';
import { nameRegexp, dateRegexp, emailRegexp } from '../../../constants/regexp';
import Checkbox from '../../Inputs/Checkbox';
import MaskedInput from 'react-text-mask'
import composeRefs from '@seznam/compose-react-refs'
import DynamicField from '../../Inputs/DynamicField';
import PhotoInput from '../../Inputs/PhotoInput';


interface Props {
  nextStepHandler: Function
}

export default function RegistrationForm({ nextStepHandler }: Props): ReactElement {
  const { handleSubmit, register, errors, setError, clearError, watch, control } = useForm({
    mode: "onBlur"
  });
  const userPassword = watch('password')

  const [userPhoto, userPhotoSet] = useState<any>();
  const onPhotoChange = (e) => {
    const input = e.target;

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        const filePath = e.target.result
        userPhotoSet(filePath);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }
  const onPhotoRemove = () => {
    userPhotoSet(undefined);
  }

  const onSubmit = values => {
    clearError("signUp");
    // TODO: handle signUp
    console.log(values);
    const valid = false;
    if (!valid) {
      setError("signUp", "signUpError", "Ошибка связи с сервером")
      // setError("signUp", "signUpExist", "Пользователь с такой почтой уже зарегистрирован")
    } else {


      nextStepHandler();
    }
  };

  const sampleList = [
    { id: 1, name: 'Участник' },
    { id: 2, name: 'Преподаватель' },
    { id: 3, name: 'Наставник' },
    { id: 4, name: 'Инвестор' },
    { id: 5, name: 'Наставник' },
    { id: 6, name: 'Инвестор' },
    { id: 7, name: 'Наставник' },
  ]

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
                    value: 6,
                    message: "Пароль должен содержать хотя бы 6 символов"
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

        <fieldset>
          <div className="row no-gutters">
            {sampleList && sampleList.map(role => <div key={role.id} className="mr-3 mb-2">
              <Checkbox ref={register({})} name={`role[${role.id}]`}>{role.name}</Checkbox>
            </div>)}
          </div>
        </fieldset>
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

            {/* TODO: place photo input */}
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

            <fieldset>
              <div className="row no-gutters">
                {sampleList && sampleList.map(sphere => <div key={sphere.id} className="mr-3 mb-2">
                  <Checkbox ref={register({})} name={`sphere[${sphere.id}]`}>{sphere.name}</Checkbox>
                </div>)}
              </div>
            </fieldset>
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
        <button className="primary mx-auto">Зарегистрироваться</button>
      </div>
    </form>
  )
}
