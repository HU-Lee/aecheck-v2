import { createContext, useState } from "react";

/**
 * 사이트 전반에 적용되는 context입니다. 
 * 
 * @param data: 캐릭터 데이터
 * @param lang: 언어 정보, 기본값 ko (한국어)
 * @param changeLang : 언어 설정 변경 함수, 로컬 스토리지에 a_lan으로 저장
 * @param version: 버전 정보, 기본값 global
 * @param changeLang : 버전 설정 변경 함수, 로컬 스토리지에 a_ver으로 저장
 * @param inven: 보유 캐릭터 정보, 로컬 스토리지에 a_inv_new으로 저장
 * @param setInven
 * @param addInven : 보유 캐릭터 추가 함수
 * @param removeInven : 보유 캐릭터 추가 함수
 * 
 * @description a_new는 구 버전 체크리스트에서 사용중이었으며 
 * 이는 사용자가 캐시를 지우지 않는 한 보존시킵니다.
 */
const AnotherContext = createContext({
    data: [] as Array<CharacterInfo>,
    lang: "ko", 
    changeLang: (word: string) => {},
    version: "global",
    changeVersion: (value: string) => {},
    inven: [] as number[],
    setInven: (data:number[]) => {},
    addInven: (id:number[]) => {},
    removeInven: (id:number) => {},
    manifest: [] as number[],
    setManifest: (data:number[]) => {},
    changeManifest: (level:number, id:number) => {}
})

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AnotherProvider = ({ children }: Props): JSX.Element => {

    const data: Array<CharacterInfo> = require("../data/character.json")

    // 코드 순서대로 sorting을 수행합니다.
    data.sort((a,b) => (a.code > b.code ? 1 : -1))

    const [lang, setLang] = useState(window.localStorage.getItem("a_lan") || "ko");
    const [version, setVersion] = useState(window.localStorage.getItem("a_ver") || "global")
    const [inven, setInven] = useState(() => {
      // 기존 데이터와 현재 데이터를 match시켜주는 데이터
      const convert_data = require("../data/old_to_new.json")

      // 케이스에 따라서 데이터를 불러옵니다.
      const local = window.localStorage.getItem("a_inv")?.split(",").map(Number) || [] as number[]
      const new_local = window.localStorage.getItem("a_inv_new") ?
      window.localStorage.getItem("a_inv_new")?.split(",").map(Number) || [] as number[]
      : local.map(a => convert_data[String(a)] ?? -1 )

      // from에 있는 캐릭터들은 필요조건이므로 없을 경우 추가시킵니다.
      const add = data.filter(a => new_local.includes(a.id)).map(a => a.from)

      return Array.from(new Set(new_local.concat(...add)))
    })
    const [manifest, setManifest] = useState(window.localStorage.getItem("a_man")?.split(",").map(Number) || [] as number[])
  
    const changeLang = (word: string): void => {
      setLang(word);
      window.localStorage.setItem("a_lan", word)
    };
    const changeVersion = (version: string): void => {
      setVersion(version);
      window.localStorage.setItem("a_ver", version)
    };

    const addInven = (id: number[]): void => {
      const newData = Array.from(new Set([...inven, ...id]))
      window.localStorage.setItem("a_inv_new", newData.join(","))
      setInven(newData);
    };
    const removeInven = (id: number): void => {
      const newData = inven.filter(a => a !== id)
      window.localStorage.setItem("a_inv_new", newData.join(","))
      setInven(newData);
    };

    const changeManifest = (level:number, id: number): void => {
      const parsedData = manifest.filter(a => a%10000 !== id)
      const newData = Array.from(new Set([...parsedData, level*10000 + id]))
      window.localStorage.setItem("a_man", newData.join(","))
      setManifest(newData);
    };
  
    return (
      <AnotherContext.Provider
        value={{
          data,
          lang,
          changeLang,
          version,
          changeVersion,
          inven,
          setInven,
          addInven,
          removeInven,
          manifest,
          setManifest,
          changeManifest,
        }}>
        {children}
      </AnotherContext.Provider>
    );
};
  
export { AnotherContext, AnotherProvider }