<template>
    <div class = "flex h-full w-5/12 justify-end items-end">
        <reciente class =" flex w-5/6 h-11/12 rounded-2xl bg-primary-bloques  h-full flex-col justify-end items-end">
				<tituloreciente class ="font-bold w-11/12 flex h-1/6 text-3xl font-sans-Poppins justify-normal items-center text-start"> Set reciente
				</tituloreciente>
				<contenedorreciente class =" w-full flex h-5/6 flex-col">
					<iconoreciente class =" w-4/5 flex h-1/2 justify-center items-center ml-auto mr-auto ">
                        <svg class =" flex justify-center items-center "  width="300" height="321" viewBox="0 0 211 231" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect x="37.8635" y="1.15962" width="174.222" height="199.965" rx="12" transform="rotate(10.5 37.8635 1.15962)" fill="#96E6D7" fill-opacity="0.4"/>
                        <rect y="34.7343" width="174.222" height="199.965" rx="12" transform="rotate(-11.5 0 34.7343)" fill="#6CC4AE"/>
                        <g filter="url(#filter0_d_164_169)">
                        <rect x="18.1846" y="15.3601" width="174.222" height="199.965" rx="12" fill="#D9D9D9"/>
                        <rect x="18.1846" y="15.3601" width="174.222" height="199.965" rx="12" fill="url(#pattern0)"/>
                        <rect x="19.1846" y="16.3601" width="172.222" height="197.965" rx="11" stroke="#6CC4AE" stroke-width="2"/>
                        </g>
                        <defs>
                        <filter id="filter0_d_164_169" x="15.0449" y="12.2204" width="186.781" height="212.523" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dx="3.13962" dy="3.13962"/>
                        <feGaussianBlur stdDeviation="3.13962"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_164_169"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_164_169" result="shape"/>
                        </filter>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#image0_164_169" transform="matrix(0.000573879 0 0 0.0005 -0.0738786 0)"/>
                        </pattern>
                        </defs>
                        </svg>
					</iconoreciente>
					<textoultimoset class ="w-full flex h-1/2 flex-col justify-center items-center"> 
						<tituloultimoset class ="font-semibold w-9/12 text-primary-100 flex h-1/6 text-xl font-sans-Poppins justify-normal items-start text-start flex-col mt-10"> Nombre del set
						</tituloultimoset>
						<asignatura class = "w-9/12 mt-2 flex h-1/6 flex-row">
							<iconoasignatura class ="w-1/12 flex justify-center items-center">
                                <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.83333 11.511C2.30556 12.0388 1.70167 12.1571 1.02167 11.866C0.341667 11.5749 0.00111111 11.0538 0 10.3027V1.71933C0 0.96933 0.340555 0.448219 1.02167 0.155997C1.70278 -0.136225 2.30667 -0.0178928 2.83333 0.510996L7.16667 4.84433C7.33333 5.011 7.45833 5.19155 7.54167 5.386C7.625 5.58044 7.66667 5.78877 7.66667 6.011C7.66667 6.23322 7.625 6.44155 7.54167 6.636C7.45833 6.83044 7.33333 7.011 7.16667 7.17766L2.83333 11.511Z" fill="#010026"/>
                                </svg>
							</iconoasignatura>
							<nombreasignatura class = "font-semibold w-9/12 flex h-1/6 text-xl font-sans-Poppins justify-normal items-start text-start  flex-col"> Asignatura
							</nombreasignatura>
						</asignatura>
						<descripcionsetreciente class ="mt-3 font-semibold w-9/12 font-sans-Poppins justify-normal items-start text-start  flex-colw-full flex h-full  flex-col text-sm">
                            La Revolución mexicana fue un conflicto armado, iniciado el 20 de noviembre de 1910 con un levantamiento encabezado por Francisco I. Madero contra el presidente Porfirio Díaz. Se caracterizó por varios movimientos socialistas, liberales, anarquistas, populistas y agrarios.
						</descripcionsetreciente>
					</textoultimoset>
				</contenedorreciente>
			</reciente>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>