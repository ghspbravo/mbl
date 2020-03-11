import React, { ReactElement, useState } from 'react'
import Layout from '../../../components/Layout'
import Head from 'next/head'
import Pages from '../../../constants/pages'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useForm, useFieldArray } from 'react-hook-form'
import Input from '../../../components/Inputs/Input'
import DynamicField from '../../../components/Inputs/DynamicField'
import PhotoInput from '../../../components/Inputs/PhotoInput'
import Select from '../../../components/Inputs/Select'
import { emailRegexp } from '../../../constants/regexp'
import Link from 'next/link'
import { businessSizesList } from '../../../constants/businessSize'
import { fetcher } from '../../../constants/fetcher'
import Api from '../../../constants/api'
import CompanyFormatter from '../../../constants/formatters/companyFormatter';

interface Props {

}

interface formValues {
  title: string,
  shortTitle: string,
  inn: string,
  sphere: number[],
  membersCount: string,
  costValue: string,
  email: string,
  phone: string,
  site: string
}

enum steps {
  main, success
}

export default function CreateCompany({ }: Props): ReactElement {
  const [step, stepSet] = useState(steps.main)


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

  const { handleSubmit, register, errors, setError, clearError, control } = useForm({
    mode: "onBlur"
  });

  const { fields: spheresList, append: appendSphere, remove: removeSphere } = useFieldArray({
    control,
    name: "sphere"
  });

  const [businessSize, businessSizeSet] = useState(businessSizesList[0].name)
  let businessSizeValue = 0;
  const onBusinessSizeChange = (value: string) => {
    businessSizeSet(businessSizesList[value].name);
    businessSizeValue = parseInt(value);
  }

  const [processing, processingSet] = useState(false);
  const onSubmit = async (values: formValues) => {
    clearError("formError")
    processingSet(true);

    const payload = {
      FullName: values.title,
      ShortName: values.shortTitle,
      INN: values.inn,
      Size: businessSizeValue,
      EmployeeCount: parseInt(values.membersCount),
      AnnualRevenue: parseInt(values.costValue),
      Email: values.email,
      Phone: values.phone,
      Site: values.site,

      // TODO: remove crunches
      Photo: "",
      OccupationIds: [0]
    }

    const apiResponse = fetcher.fetch(Api.CreateCompany, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    const formatter = new CompanyFormatter();

    const response = await formatter.createCompany(apiResponse)
    if (response.status > 0) {
      setError("formError", "formError", response.body)
    } else {
      stepSet(steps.success)
    }

    processingSet(false);
  }
  return (
    <Layout>
      <Head>
        <title>{Pages.CreateCompany.title}</title>
      </Head>

      <section>
        <div className="container">
          <Breadcrumbs pages={[
            { title: Pages.Profile.header, href: Pages.Profile.route },
            { title: Pages.CreateCompany.header }
          ]} />

          <h1>{Pages.CreateCompany.header}</h1>
        </div>

        {step === steps.main && <div>
          <div className="container">

            <div className="col-lg-8 px-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Common */}
                <fieldset>
                  <div className="mb-3">
                    <Input name="title" label="Полное наименование компании" required
                      error={errors.title}
                      ref={register({
                        required: true,
                        minLength: {
                          value: 6,
                          message: "Введите полное наименование компании"
                        }
                      })}
                    />
                  </div>

                  <div className="mb-3">
                    <Input name="shortTitle" label="Сокращенное название компании"
                      error={errors.title}
                      ref={register({})}
                    />
                  </div>

                  <div className="mb-3">
                    <Input name="inn" label="ИНН"
                      ref={register()} />
                  </div>

                  <div className="mb-3">
                    <div className="label-text mb-2">Виды деятельности</div>
                    {spheresList.map((sphere, index) => <div key={sphere.id} className="mb-2">
                      <DynamicField removeHandler={() => removeSphere(index)}>
                        <div>
                          <Input name={`sphere[${index}]`} ref={register({})} />
                        </div>
                      </DynamicField>
                    </div>)}
                    <button className="link primary clear" type="button" onClick={() => appendSphere({})}>+ добавить</button>
                  </div>

                </fieldset>

                <div className="mb-5">
                  <PhotoInput image={userPhoto} onRemove={onPhotoRemove} onChange={onPhotoChange} />
                </div>

                <fieldset>

                  <div className="mb-3">
                    <div className="row">
                      <div className="mb-2 col-lg-4 col-6">
                        <div className="label-text mb-2">Размер бизнеса</div>
                        <Select items={businessSizesList} changeHandler={onBusinessSizeChange} >{businessSize}</Select>
                      </div>
                      <div className="mb-2 col-lg-4 col-6">
                        <Input label="Кол.-во сотрудников" name="membersCount" ref={register({})} type="number" min="1" />
                      </div>
                      <div className="mb-2 col-lg-4 col-12">
                        <Input label="Объем годовой выручки" name="costValue" ref={register({})} type="number" min="1" />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <div className="mb-2">
                    <Input name="email" type="email" label="E-mail"
                      error={errors.email}
                      ref={register({
                        pattern: {
                          value: emailRegexp,
                          message: "Неверный формат почты"
                        }
                      })}
                    />
                  </div>

                  <div className="mb-2">
                    <Input name="phone" type="phone" label="Телефон"
                      // error={errors.phone}
                      // TODO: add phone regexp
                      ref={register({})}
                    />
                  </div>

                  <div className="mb-2">
                    <Input name="site" type="site" label="Сайт"
                      ref={register({})}
                    />
                  </div>
                </fieldset>

                {errors.formError && <div className="mb-2 error">
                  {(errors.formError as any).message}
                </div>}

                <button disabled={processing} className="primary">{processing ? "Создание..." : "Создать"}</button>
              </form>
            </div>
          </div>
        </div>}

        {step === steps.success && <div className="container">
          <h1>Успех!</h1>
          <p>Компания привязана к вашему аккаунту.</p>
          <Link passHref href={Pages.Profile.route}>
            <a className="clear button">Вернуться в личный кабинет</a>
          </Link>
        </div>}
      </section>
    </Layout>
  )
}
