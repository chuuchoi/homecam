import type { LoaderFunctionArgs } from "react-router";

export async function action({ request }: LoaderFunctionArgs) {
  console.log('??')
  const body = await request.json();
  const modelId = body.device_model_name;
  const home = body.home;
  const camName = body.cam_name;
  const notification = body.notification;

  // 해당 모델 카메라 조회 및 등록

  return { ok: true, message: ` 장치 등록 완료\n모델명: ${modelId}\n홈 이름: ${home}\n카메라 이름: ${camName}\n알림: ${JSON.stringify(notification)}` };
}
